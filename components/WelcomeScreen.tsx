import React, { useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';


const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    // Automatically navigate to the Home screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    
    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon.png')}
        style={styles.img}
      />
      <Text style={styles.title}>GeoLocAtt</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#696ee5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  img:{
   height:100,
   width:100,
    
  }
});

export default WelcomeScreen;
