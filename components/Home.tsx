import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';

const Home = ({dist}) => {

  console.log(dist);

  const navigation = useNavigation();
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
         navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error checking for token:', error);
      }
    };
    checkLoggedIn();
  }, []);




  const [isCheckedIn, setIsCheckedIn] = useState(false);


  const handleCheckin = () => {
    setIsCheckedIn(true);
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
            <Text style={styles.statusTitle}>Current location:</Text>
            <Text style={[styles.statusValue,{color:'green', fontWeight:'700'}]}>Inside 200 m radius</Text>
          </View>
        </View>
        <TouchableOpacity style={!isCheckedIn ? styles.checkinButton : styles.checkoutButton}  onPress={handleCheckin}>
          {isCheckedIn ? <Text style={styles.checkinButtonText}>Check-out</Text> : <Text style ={styles.checkinButtonText}>Check-in</Text> }
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}  onPress={() => navigation.navigate('Dashboard')}>
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
    // flex: 1,
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
  header: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
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
