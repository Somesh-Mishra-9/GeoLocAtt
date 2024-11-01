import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Register = ({ navigation }) => {


    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role:'',
    });

    const handleRegister = async () => {
        if(formData.password !== formData.confirmPassword){
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://192.168.153.217:8000/api/v1/users/register', formData, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            if (response.status === 201) {
                // Navigate to login or home
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Network error details:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput placeholder="Full Name" style={styles.input} onChangeText={text => setFormData({ ...formData, fullName: text })} />
                <TextInput placeholder="Email" style={styles.input} onChangeText={text => setFormData({ ...formData, email: text })} />
                <TextInput placeholder="Username" style={styles.input} onChangeText={text => setFormData({ ...formData, username: text })} />
                <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={text => setFormData({ ...formData, password: text })} />
                <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry onChangeText={text => setFormData({ ...formData, confirmPassword: text })} />
                <TextInput placeholder="Role" style={styles.input} secureTextEntry onChangeText={text => setFormData({ ...formData, role: text })} />
                <TouchableOpacity style={styles.RegisterBtn} onPress={handleRegister}>
                    <Text style={styles.RegisterBtnText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.signinContainer}>
                    <Text onPress={() => navigation.navigate('Login')}>Already have an account? Sign In</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    signinContainer: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center'

    },

    formContainer: {
        width: '80%',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        paddingVertical: 20,
    },
    input: {
        paddingHorizontal: 10,
        paddingStart: 20,
        borderColor: '#ccc',
        height: 40,
        backgroundColor: '#f7f7f9',
        marginBottom: 10,
        borderRadius: 5,

    },

    RegisterBtn: {
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        backgroundColor: '#3c9df8', 
        width: '80%',
        alignSelf:'center'
      },
      RegisterBtnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
      }

});

export default Register;
