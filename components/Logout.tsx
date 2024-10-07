import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Logout() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:32}}>You are logged out.</Text>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})