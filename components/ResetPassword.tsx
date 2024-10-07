import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ResetPassword = props => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('User ID:', userId);
    console.log('Password:', password);
  };

  return (
    <View>
      <Image
        source={require('../assets/image.png')}
        style={styles.img}
      />
      <View style={styles.container}>
        <View style={styles.userIcon}>
          <Icon name="lock-reset" size={85} color="#666" />
        </View>
        <Text style={styles.loginText}>Reset Your Password</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter New Password</Text>
          <TextInput
            style={styles.input}
            value={userId}
            onChangeText={setUserId}
            placeholder="Password"
            //keyboardType="numeric"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Confirm password"
            //secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          style={styles.changePasswordbtn}
          onPress={() => {
            props.navigation.navigate('Password Updated');
          }}>
          <Text style={styles.changePasswordtext}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    marginTop: '0%',
    top: 0,
    height: '39%',
    width: '100%',
  },
  container: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
    // backgroundColor: 'yellow',
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
    gap: 20,
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
  changePasswordbtn: {
    backgroundColor: '#597bff', // Blue button
    padding: 15,
    borderRadius: 5,
    width: '80%',
  },
  changePasswordtext: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ResetPassword;
