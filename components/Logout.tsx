import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';

export default function Logout({ navigation }) {
  const logoutUser = async () => {
    try {
      // Retrieve the access token from AsyncStorage
      const token = await AsyncStorage.getItem('accessToken');

      // Make sure the token is available
      if (!token) {
        console.log('No token found');
        return;
      }
      console.log(token)

      const response = await axios.post(
        'http://192.168.160.217:8000/api/v1/users/logout',
        {},
        {
          headers: {
            Authorization:`Bearer ${token}`, // Include the token in the headers
          },
          withCredentials: true, // Ensure cookies are sent
          timeout: 5000,
        }
      );

      await AsyncStorage.clear();

      if (response.status === 200) {
        console.log('User logged out');
      }

      // Reset the navigation stack to the Login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );

    } catch (error) {
      console.log('Error:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32 }}>Logging out....</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
