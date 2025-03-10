import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  DrawerLayoutAndroid,
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import Location from 'react-native-location';
import { getDistance } from 'geolib';
import messaging from '@react-native-firebase/messaging';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import your components
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AttendanceReport from './components/AttendanceReport';
import LeaveRequest from './components/LeaveRequest';
import LeaveStatus from './components/LeaveStatus';
import Logout from './components/Logout';
import Login from './components/Login';
import DrawerContent from './components/DrawerContent';

const Stack = createStackNavigator();

// Request permission for notifications
messaging().requestPermission()
  .then(enabled => {
    if (enabled) {
      console.log('Authorization status:', enabled);
    }
  });

// Handle background messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const App = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [dist, setDist] = useState(0);
  const [deviceToken, setDeviceToken] = useState<string | null>(null); // To store the device token
  const officeCoordinates = { latitude: 25.9992494, longitude: 84.6902146 };
  const drawer = useRef<DrawerLayoutAndroid>(null);

  // Function to get the Firebase device token
  const getDeviceToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Device Token:', token);
      setDeviceToken(token);
    } catch (error) {
      console.error('Failed to get device token:', error);
    }
  };

  // Request notification permissions and fetch the token
  const setupNotifications = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permissions granted.');
      await getDeviceToken();
    } else {
      console.log('Notification permissions denied.');
    }

    // Listen for token refresh
    messaging().onTokenRefresh((token) => {
      console.log('Token refreshed:', token);
      setDeviceToken(token);
    });

    // Handle foreground notifications
    messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  };

  useEffect(() => {
    setupNotifications(); // Set up notifications during initialization

    const setupLocationTracking = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Location permission is required.');
          return;
        }
        
        // Use native module to check location settings
        try {
          await NativeModules.LocationModule.checkAndRequestLocationSettings();
        } catch (error) {
          console.error('Location settings error:', error);
          return;
        }
      }

      // Set up a timer to periodically check location instead of using subscribeToLocationUpdates
      const locationCheckInterval = setInterval(async () => {
        try {
          let locationData;
          
          if (Platform.OS === 'android') {
            // Use our native module for Android
            try {
              locationData = await NativeModules.LocationModule.getLocation();
            } catch (error) {
              console.error('Native location error:', error);
              return;
            }
          } else {
            // Use RNLocation for iOS
            try {
              locationData = await Location.getLatestLocation({ timeout: 10000 });
            } catch (error) {
              console.error('RNLocation error:', error);
              return;
            }
          }
          
          if (locationData) {
            const userCoords = {
              latitude: locationData.latitude,
              longitude: locationData.longitude,
            };

            if (isWithinRadius(userCoords) && !isCheckedIn) {
              if (deviceToken) {
                sendPushNotification('Check-in Reminder', 'You are within 200m radius.');
                setIsCheckedIn(true);
              } else {
                console.error('Device token is not available');
              }
            }
          }
        } catch (error) {
          console.error('Error getting location:', error);
        }
      }, 30000); // Check every 30 seconds

      return () => {
        clearInterval(locationCheckInterval);
      };
    };

    setupLocationTracking();
  }, [isCheckedIn, deviceToken]);

  const isWithinRadius = (userCoords: { latitude: number; longitude: number }) => {
    const distance = getDistance(userCoords, officeCoordinates);
    setDist(distance);
    return distance <= 70000;
  };

  const fetchAccessToken = async () => {
    try {
      const response = await fetch('http://192.168.176.217:8000/access-token'); // Replace with your backend service URL
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Failed to fetch access token:', error);
      return null;
    }
  };

  const sendPushNotification = async (title: string, message: string) => {
    if (!deviceToken) {
      console.error('Device token is not available');
      return;
    }

    const accessToken = await fetchAccessToken();
    if (!accessToken) {
      console.error('Access token is not available');
      return;
    }

    const url = `https://fcm.googleapis.com/v1/projects/geolocatt-db4a4/messages:send`; // Replace geolocatt-db4a4 with your actual project ID
    const payload = {
      message: {
        token: deviceToken,
        notification: {
          title,
          body: message,
        },
      },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('Push Notification Sent:', result);
    } catch (error) {
      console.error('Error Sending Push Notification:', error);
    }
  };

  const themeConfig = {
    ...config,
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
  };

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={themeConfig}>
        <NavigationContainer>
          <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            renderNavigationView={() => <DrawerContent drawer={drawer} />}>
            <Stack.Navigator initialRouteName="Welcome Screen">
              <Stack.Screen
                name="Home"
                options={{
                  header: () => (
                    <View style={styles.appbarContainer}>
                      <Icon
                        name="bars"
                        size={30}
                        onPress={() => drawer.current?.openDrawer()}
                      />
                      <Text style={styles.appbarText}>Home</Text>
                    </View>
                  ),
                }}>
                {(props) => <Home {...props} dist={dist} />}
              </Stack.Screen>
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="Attendance Report" component={AttendanceReport} />
              <Stack.Screen name="Request a Leave" component={LeaveRequest} />
              <Stack.Screen name="Leave Status" component={LeaveStatus} />
              <Stack.Screen name="Log out" component={Logout} />
            </Stack.Navigator>
          </DrawerLayoutAndroid>
        </NavigationContainer>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  appbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  appbarText: {
    marginLeft: 20,
    fontSize: 25,
    fontWeight: '800',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  navItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  navText: {
    fontSize: 16,
    color: '#333',
  },
  navLinks: {
    marginTop: 20,
  },
  selectedNavItem: {
    backgroundColor: '#d0d0d0',
  },
  selectedNavText: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default App;