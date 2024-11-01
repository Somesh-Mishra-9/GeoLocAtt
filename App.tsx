import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { GluestackUIProvider, Text, useTheme, setTheme } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  DrawerLayoutAndroid,
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';
import messaging from '@react-native-firebase/messaging';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AttendanceReport from './components/AttendanceReport';
import LeaveRequest from './components/LeaveRequest';
import LeaveStatus from './components/LeaveStatus';
import Logout from './components/Logout';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';
import CodeVerificationEmail from './components/CodeVerificationEmail';
import CodeVerificationOtp from './components/CodeVerificationOtp';
import ResetPassword from './components/ResetPassword';
import PasswordUpdate from './components/PasswordUpdate';
import WelcomeScreen from './components/WelcomeScreen';
import Register from './components/Register';

const Stack = createStackNavigator();

const DrawerContent = ({ drawer }) => {
  const navigation = useNavigation();
  const [selectedMenu, setSelectedMenu] = useState('Home');

  const renderMenuItem = (menuName) => (
    <TouchableOpacity
      style={[styles.navItem, selectedMenu === menuName && styles.selectedNavItem]}
      onPress={() => {
        setSelectedMenu(menuName);
        drawer.current?.closeDrawer();
        navigation.navigate(menuName);
      }}>
      <Text
        style={[styles.navText, selectedMenu === menuName && styles.selectedNavText]}>
        {menuName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.profileContainer}>
        <Icon name="user-circle" size={70} color="#4B0082" />
        <Text style={styles.username}>Somesh Mishra</Text>
      </View>

      <View style={styles.divider} />
      <View style={styles.navLinks}>
        {renderMenuItem('Home')}
        {renderMenuItem('Dashboard')}
        {renderMenuItem('Attendance Report')}
        {renderMenuItem('Request a Leave')}
        {renderMenuItem('Leave Status')}
        {renderMenuItem('Logout')}
      </View>
    </View>
  );
};


const App = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [dist, setDist] = useState('');
  const officeCoordinates = { latitude: 25.9992494, longitude: 84.6902146 };
  const drawer = useRef(null);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('Token:', token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);





  useEffect(() => {
    requestLocationPermission();
    const watchId = Geolocation.watchPosition(
      (position) => {
        const userCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        if (isWithinRadius(userCoords) && !isCheckedIn) {
          Alert.alert('Check-in Reminder', 'You are within 200m radius.');
          setIsCheckedIn(true);
        } else if (!isWithinRadius(userCoords) && isCheckedIn) {
          console.log('Checked out automatically');
          setIsCheckedIn(false);
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, distanceFilter: 1 }
    );

    return () => Geolocation.clearWatch(watchId);
  }, [isCheckedIn]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Location permission denied. Please enable it in settings.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const isWithinRadius = (userCoords) => {
    const distance = getDistance(userCoords, officeCoordinates);
    setDist(distance);
    return distance <= 200;
  };

  const themeConfig = {
    ...config,
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
  };

  return (
    <GluestackUIProvider config={themeConfig}>
      <NavigationContainer>
        <DrawerLayoutAndroid
          ref={drawer}
          drawerWidth={300}
          renderNavigationView={() => <DrawerContent drawer={drawer} />}>
          <Stack.Navigator initialRouteName="Welcome Screen">
            <Stack.Screen name="Welcome Screen" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Forgot Password" component={ForgetPassword} />
            <Stack.Screen name="Verify via email" component={CodeVerificationEmail} />
            <Stack.Screen name="Verify via SMS" component={CodeVerificationOtp} />
            <Stack.Screen name="Password Reset" component={ResetPassword} />
            <Stack.Screen name="Password Updated" component={PasswordUpdate} />
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
  username: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  navLinks: {
    marginTop: 20,
  },
  navItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedNavItem: {
    backgroundColor: '#d0d0d0',
  },
  navText: {
    fontSize: 16,
    color: '#333',
  },
  selectedNavText: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default App;
