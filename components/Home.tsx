import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform, PermissionsAndroid, NativeModules} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNLocation from 'react-native-location';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

// Define types
type LocationType = {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number | null;
  altitude: number | null;
};

type HomeProps = {
  dist: number;
};

// Define geolocation types to avoid linter errors
interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

const Home = ({dist}: HomeProps) => {
  const navigation = useNavigation<any>();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<LocationType | null>(null);
  const locationTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const user = auth().currentUser;
        if (!user) {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        navigation.navigate('Login');
      }
    };
    checkLoggedIn();
    
    // Configure location
    setupLocation();

    // Clean up timer on unmount
    return () => {
      if (locationTimerRef.current) {
        clearInterval(locationTimerRef.current);
      }
    };
  }, []);

  const setupLocation = async () => {
    try {
      // First check and request location permissions
      if (Platform.OS === 'android') {
        try {
          // Request Android permissions
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'App needs access to your location to mark attendance.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }
          );
          
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission Denied', 'Location permission is required.');
            return;
          }
          
          // Check location settings using native module
          try {
            await NativeModules.LocationModule.checkAndRequestLocationSettings();
          } catch (error) {
            console.error('Location settings error:', error);
            Alert.alert('Location Error', 'Please enable location services and restart the app.');
            return;
          }
        } catch (error) {
          console.error('Permission error:', error);
          return;
        }
      } else {
        // iOS permissions - keep using RNLocation for iOS
        const permission = await RNLocation.requestPermission({
          ios: 'whenInUse',
          android: {
            detail: 'fine'
          }
        });
        
        if (!permission) {
          Alert.alert('Permission Denied', 'Location permission is required.');
          return;
        }
      }
      
      // Get current location immediately
      await getCurrentLocation();
      
      // Set up a timer to periodically update location
      locationTimerRef.current = setInterval(getCurrentLocation, 10000); // Update every 10 seconds
    } catch (error) {
      console.error('Error setting up location:', error);
      Alert.alert('Location Error', 'Failed to initialize location services. Please restart the app.');
    }
  };

  const getCurrentLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        // Use our native module for Android
        try {
          const nativeLocation = await NativeModules.LocationModule.getLocation();
          if (nativeLocation) {
            setLocation({
              latitude: nativeLocation.latitude,
              longitude: nativeLocation.longitude,
              accuracy: nativeLocation.accuracy || 0,
              speed: nativeLocation.speed || null,
              altitude: nativeLocation.altitude || null
            });
          }
        } catch (nativeError) {
          console.error('Native location error:', nativeError);
        }
      } else {
        // Use RNLocation for iOS
        try {
          const locationData = await RNLocation.getLatestLocation({timeout: 15000});
          if (locationData) {
            setLocation({
              latitude: locationData.latitude,
              longitude: locationData.longitude,
              accuracy: locationData.accuracy,
              speed: locationData.speed,
              altitude: locationData.altitude
            });
          } else {
            console.log('No location data available');
          }
        } catch (locationError) {
          console.error('RNLocation error:', locationError);
        }
      }
    } catch (error) {
      console.error('Location error:', error);
      // Don't show alert on every update failure to avoid spamming the user
    }
  };

  const handleCheckin = async () => {
    if (!location) {
      Alert.alert('Error', 'Location not available. Please enable location services.');
      return;
    }

    setLoading(true);
    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert('Error', 'You must be logged in to check in');
        return;
      }
      
      const response = await fetch('YOUR_BACKEND_URL/api/attendance/mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude,
          deviceInfo: Platform.OS,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsCheckedIn(!isCheckedIn);
        Alert.alert('Success', isCheckedIn ? 'Check-out successful!' : 'Check-in successful!');
      } else {
        Alert.alert('Error', data.message || 'Failed to mark attendance');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to mark attendance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkinContainer}>
        <View style={styles.locationContainer}>
          <View style={styles.locationIcon}>
            <Image
              source={{
                uri: 'https://png.pngtree.com/png-vector/20230413/ourmid/pngtree-3d-location-icon-clipart-in-transparent-background-vector-png-image_6704161.png',
              }}
              style={styles.icon}
            />
          </View>
          <View style={styles.locationText}>
            <Text style={styles.locationTitle}>Your Allocated Location:</Text>
            <Text style={styles.locationDetails}>
             GAIL Corporate Office: GAIL(INDIA) Ltd.
            </Text>
            <Text style={styles.locationDetails}>
              GAIL Bhawan, 16 Bhikaji Cama Place, RK Puram, New Delhi - 110066
            </Text>
          </View>
        </View>
        <View>
          <Text>
            Distance from office: <Text style={{fontWeight:'800'}}>{dist} meters</Text>
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.status}>
            <Text style={styles.statusTitle}>Current status:</Text>
            <Text style={styles.statusValue}>
              {isCheckedIn ? <Text style={{ color:'green', fontWeight:'700' }}>Checked-in</Text> : <Text style={{color:'red', fontWeight:'700'}}>Not Checked-in</Text>}
            </Text>
          </View>
          <View style={styles.status}>
            <Text style={styles.statusTitle}>Location status:</Text>
            <Text style={[styles.statusValue, {color: location ? 'green' : 'red', fontWeight:'700'}]}>
              {location ? 'Available' : 'Not Available'}
            </Text>
          </View>
        </View>
        <TouchableOpacity 
          style={[!isCheckedIn ? styles.checkinButton : styles.checkoutButton, loading && styles.buttonDisabled]} 
          onPress={handleCheckin}
          disabled={loading}>
          <Text style={styles.checkinButtonText}>
            {loading ? 'Processing...' : isCheckedIn ? 'Check-out' : 'Check-in'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Dashboard')}>
          <View style={styles.optionIcon}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/6821/6821002.png',
              }}
              style={styles.icon}
            />
          </View>
          <Text style={styles.optionText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Attendance Report')}>
          <View style={styles.optionIcon}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3534/3534063.png',
              }}
              style={styles.icon}
            />
          </View>
          <Text style={styles.optionText}>Attendance Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Request a Leave')}>
          <View style={styles.optionIcon}>
            <Image
              source={{
                uri: 'https://png.pngtree.com/png-vector/20220710/ourmid/pngtree-air-ticket-vector-illustration-png-image_5828828.png',
              }}
              style={styles.icon}
            />
          </View>
          <Text style={styles.optionText}>Request a Leave</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Leave Status')}>
          <View style={styles.optionIcon}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/019/879/196/non_2x/passage-of-time-icon-on-transparent-background-free-png.png',
              }}
              style={styles.icon}
            />
          </View>
          <Text style={styles.optionText}>Leave Status</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  checkinContainer:{
    padding: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  locationIcon: {
    marginRight: 12,
  },
  icon: {
    width: 60,
    height: 60,
  },
  locationText: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:5,
  },
  locationDetails: {
    fontSize: 14,
    color: '#888',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  status: {
    flex: 1,
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusValue: {
    fontSize: 16,
    color: '#333',
  },
  checkinButton: {
    backgroundColor: 'green',
    padding: 10,
    margin: 12,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: '#fc120a',
    padding: 10,
    margin: 12,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  checkinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  option: {
    width: '48%',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  optionIcon: {
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight:'500'
  },
});

export default Home;
