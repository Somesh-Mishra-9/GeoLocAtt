import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
export default function CodeVerificationOtp(props) {
  return (
    <View>
      <Image
        source={require('../assets/image.png')}
        style={styles.img}
      />
      <View style={styles.container}>
        <View style={styles.userIcon}>
          <Fontisto name="email" size={60} color="#666" />
        </View>
        <Text style={styles.getYourCodeText}>Get Your Code</Text>
        <Text style={styles.pleaseEnterText}>
          Please enter the 4-digit verification code sent to +91 82106867XX
        </Text>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            // value="1"
            placeholder="1"
          />
          <TextInput
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            // value="1"
            placeholder="2"
          />
          <TextInput
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            // value="1"
            placeholder="3"
          />
          <TextInput
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            // value="1"
            placeholder="4"
          />
        </View>
        <Text style={styles.paragraphText}>
          Didn’t receive the verification code? Send again
        </Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            props.navigation.navigate('Password Reset');
          }}>
          <Text style={styles.loginButtonText}>Verify</Text>
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
  otp: {
    width: 130,
    height: 130,
  },
  input: {
    width: 60,
    height: 60,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#F9F9F9',

    // borderWidth: 2,
    // borderColor: 'red',
    // borderStyle: 'SOLID',
  },
  inputcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 55,
  },
  getYourCodeText: {
    fontSize: 38,
    fontWeight: 'bold',
    // marginBottom: 30,
    color: '#696ee5',
  },
  pleaseEnterText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    //marginBottom: 10,
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
