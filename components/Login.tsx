import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Home from './Home';
const Login = props => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('User ID:', userId);
    console.log('Password:', password);
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
          <Text style={styles.inputLabel}>User ID</Text>
          <TextInput
            style={styles.input}
            value={userId}
            onChangeText={setUserId}
            placeholder="Enter User ID"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text
            style={styles.loginButtonText}
            onPress={() => {
              props.navigation.navigate('Home');
            }}>
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
    // marginTop: 50,

    backgroundColor: '#696ee5',
    height: 160,
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
