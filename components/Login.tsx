import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Sign in with Firebase
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      
      // Get FCM token for push notifications
      const fcmToken = await messaging().getToken();
      
      // Update user's FCM token in your backend
      await fetch('YOUR_BACKEND_URL/api/users/fcm-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await userCredential.user.getIdToken()}`,
        },
        body: JSON.stringify({ fcmToken }),
      });

      props.navigation.navigate('Home');
    } catch (error) {
      console.error('Login failed:', error);
      let errorMessage = 'Login failed. Please try again.';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
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
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
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

        <TouchableOpacity 
          style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
          onPress={loginUser}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>
              Log In
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.registerButtonText}>
            Don't have an account? Register
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
  loginButton: {
    backgroundColor: '#597bff',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    color: '#597bff',
    fontSize: 16,
  },
});

export default Login;
