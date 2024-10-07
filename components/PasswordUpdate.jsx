import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
export default function PasswordUpdate(props) {
  return (
    <View>
      <Image
        source={require('../assets/image.png')}
        style={styles.img}
      />
      <View style={styles.container}>
        <View style={styles.userIcon}>
          <Icon name="checkcircle" size={120} color="green" />
        </View>
        <Text style={styles.passwordUpdateText}>Password Updated!!</Text>
        <TouchableOpacity
          style={styles.backToLoginButton}
          onPress={() => {
            props.navigation.navigate('Login');
          }}>
          <Text style={styles.backToLoginText}>Go Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    marginTop: '0%',
    top: 0,
    height: '39%',
    width: '100%',
  },
  container: {
    marginTop: 100,
    flex: 1,
    alignItems: 'center',
    gap: 45,
  },
  passwordUpdateText: {
    fontSize: 38,
    fontWeight: 'bold',
    // marginBottom: 30,
    color: '#696ee5',
  },
  backToLoginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backToLoginButton: {
    marginTop: 45,
    backgroundColor: '#597bff', // Blue button
    padding: 15,
    borderRadius: 5,
    width: '80%',
  },
});
