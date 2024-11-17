
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Home from './Home';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';





const Login = props => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');


  const loginUser = async () => {
    try {
      console.log('Logging in...');
      const response = await axios.post('http://192.168.160.217:8000/api/v1/users/login', {
        email: emailOrUsername.includes('@') ? emailOrUsername : undefined,
        username: !emailOrUsername.includes('@') ? emailOrUsername : undefined,
        password
      });

      console.log('Response data:', response.data);
      
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data.data;

        // console.log('Access Token:', accessToken);  // Log tokens for debugging
        // console.log('Refresh Token:', refreshToken);
  
        if (!accessToken || !refreshToken) {
          throw new Error('Invalid tokens received');
        }
        
        // Store tokens securely
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
  
      
        props.navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GeoLocAtt</Text>
        <Text style={styles.subtitle}>
          Geolocation Based Attendance Tracking App
        </Text>
      </View>

      <View style={styles.loginContainer}>
        <View style={styles.userIcon}>
          <Icon name="user-large" size={60} color="#666" />
        </View>
        <Text style={styles.loginText}>Login</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
            placeholder="Enter your username"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.forgot}
            onPress={() => {
              props.navigation.navigate('Forgot Password');
            }}>
            <Text style={{fontWeight: 500, color: 'brown'}}>Forgot?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
          <Text style={styles.loginButtonText}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#696ee5',
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    marginBottom: 20,
  },
  loginText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#696ee5',
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
    position: 'relative',
  },
  forgot: {
    position: 'absolute',
    top: 36,
    right: 5,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotText: {
    fontSize: 14,
    color: '#666',
  },
  loginButton: {
    backgroundColor: '#597bff', // Blue button
    padding: 15,
    borderRadius: 5,
    width: '80%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;
