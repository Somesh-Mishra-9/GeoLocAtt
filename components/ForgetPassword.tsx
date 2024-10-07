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

import Icon from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
const ForgetPassword = props => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image.png')}
        style={styles.img}
      />
      <View style={styles.fogotContainer}>
        <View style={styles.userIcon}>
          <Icon name="lock" size={60} color="#666" />
        </View>
        <Text style={styles.forgotText}>Forgot Password?</Text>
        <View>
          <Text style={styles.subforgotText}>Choose Appropriate Method</Text>
          <Text style={styles.paragraphText}>
            Select which contact detail should we use to reset your password ?
          </Text>
        </View>
      </View>
      <View style={{flex: 1, gap: 20, marginTop: 0, marginBottom:60}}>
        <TouchableOpacity
          style={styles.smsemailcontainer}
          onPress={() => {
            props.navigation.navigate('verify via SMS');
          }}>
          <View>
            <Icon name="sms" size={50} color="#666" />
          </View>
          <View>
            <Text style={styles.smsemailtext}>Via SMS :</Text>
            <Text style={styles.smsemailtext}>+91 82106867XX</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smsemailcontainer}
          onPress={() => {
            props.navigation.navigate('Verify via email');
          }}>
          <View>
            <Fontisto name="email" size={50} color="#666" />
          </View>
          <View>
            <Text style={styles.smsemailtext}>Via email :</Text>
            <Text style={styles.smsemailtext}>user101@gmail.com</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    marginTop: '0%',
    top: 0,
    height: '15%',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#663399',
    padding: 20,
    width: '100%',
  },
  forgotText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#696ee5',
    marginBottom: 15,
  },
  userIcon: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  fogotContainer: {
    flex: 1,
    //justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    //backgroundColor: 'yellow',
  },
  subforgotText: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  paragraphText: {
    alignSelf: 'flex-start',
    fontSize: 14,
  },
  smsemailcontainer: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    flexDirection: 'row',
    minWidth:'90%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    borderRadius: 20,
    paddingTop: 10,
    paddingRight: 25,
    paddingBottom: 10,
    paddingLeft: 25,
  },
  smsemailtext: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default ForgetPassword;
