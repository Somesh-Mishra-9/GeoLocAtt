import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Dashboard = () => {
 

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.userContainer} >
        <Icon name="user-circle" size={70} color="#4B0082" />
        <Text style={styles.profileName}>Somesh Mishra</Text>
        </View>
        <Text style={styles.status}>Status: <Text style={styles.checkedIn}>Checked-in</Text></Text>
      </View>

      <View style={styles.attendanceContainer}>
        <Text style={styles.attendanceHeader}>Attendance Summary</Text>
        <View style={styles.attendanceItem}>
          <View style={styles.attendanceIcon}>
            <Image source={{uri:'https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/attendance-icon.png'}} style={styles.icon} />
          </View>
          <Text style={styles.attendanceText}>Total Attendance: 23</Text>
        </View>
        <View style={styles.attendanceItem}>
          <View style={styles.attendanceIcon}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/7250/7250666.png'}} style={styles.icon} />
          </View>
          <Text style={styles.attendanceText}>Number of leaves: 02</Text>
        </View>
        <View style={styles.attendanceItem}>
          <View style={styles.attendanceIcon}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/826/826165.png'}} style={styles.icon} />
          </View>
          <Text style={styles.attendanceText}>Total Working Hours: 178 hrs</Text>
        </View>
        <View style={styles.attendanceItem}>
          <View style={styles.attendanceIcon}>
            <Image source={{uri:'https://static.thenounproject.com/png/1997070-200.png'}} style={styles.icon} />
          </View>
          <Text style={styles.attendanceText}>Number of Check-ins: 30</Text>
        </View>
        <View style={styles.attendanceItem}>
          <View style={styles.attendanceIcon}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/906/906811.png'}} style={styles.icon} />
          </View>
          <Text style={styles.attendanceText}>Number of Check-outs: 29</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  userContainer:{
    justifyContent:'flex-start',
    alignItems:'center',
    flexDirection:'row',
    marginVertical:10,
    gap:10,
  },
  profileIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  userIcon: {
    width: 40,
    height: 40,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
  },
  checkedIn: {
    color: 'green',
    fontWeight:'700',
  },
  attendanceContainer: {
    marginBottom: 40,
  },
  attendanceHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  attendanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 10,
  },
  attendanceIcon: {
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  attendanceText: {
    fontSize: 14,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  navigationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationIcon: {
    width: 16,
    height: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
});

export default Dashboard;