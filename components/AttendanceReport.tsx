import React, { useState } from 'react';
import {

  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';




const AttendanceReport = () => {
  const [sort, setSort] = useState('Date');
  const [filter, setFilter] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());


  const data = [
    { date: '18/09/24', checkIn: '10:05:43', checkOut: '17:02:24', workingHours: '06:56:41' },
    { date: '19/09/24', checkIn: '10:02:23', checkOut: '17:04:18', workingHours: '07:02:55' },
    { date: '20/09/24', checkIn: '10:03:35', checkOut: '17:05:34', workingHours: '07:01:59' },
    { date: '21/09/24', checkIn: '10:05:12', checkOut: '17:04:56', workingHours: '07:01:44' },
    { date: '22/09/24', checkIn: '10:08:43', checkOut: '17:09:34', workingHours: '07:00:51' },
    { date: '23/09/24', checkIn: '10:07:12', checkOut: '17:06:23', workingHours: '06:59:11' },
    { date: '24/09/24', checkIn: '10:03:13', checkOut: '17:07:47', workingHours: '07:04:34' },
    { date: '25/09/24', checkIn: '10:09:37', checkOut: '17:02:32', workingHours: '06:52:55' },
    { date: '26/09/24', checkIn: '10:01:40', checkOut: '17:08:21', workingHours: '07:06:41' },
    { date: '27/09/24', checkIn: '10:08:42', checkOut: '17:13:25', workingHours: '07:04:43' },
    { date: '28/09/24', checkIn: '10:07:00', checkOut: '17:07:25', workingHours: '07:00:25' },
    { date: '29/09/24', checkIn: '10:03:10', checkOut: '17:11:20', workingHours: '07:08:10' },
    { date: '30/09/24', checkIn: '10:06:21', checkOut: '17:04:28', workingHours: '06:58:07' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => {
            setSort('Date');
          }}
          style={styles.filterButton}>
            <Icon name='sort' size={20}/>
          <Text style={styles.filterButtonText}>Date</Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFilter(!filter);
          }}
          style={styles.filterButton}>
            <Icon name='filter' size={20}/>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>


        <Text style={styles.filterText}>
          From: 18/09/24
        </Text>


        <Text style={styles.filterText}>
          To: 30/09/24
          {/* <MaterialIcons name="date-range" size={24} color="black" /> */}
        </Text>
      </View>
      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderItem}>Date</Text>
          <Text style={[styles.tableHeaderItem,{marginLeft:20}]}>Check-in</Text>
          <Text style={styles.tableHeaderItem}>Check-out</Text>
          <Text style={styles.tableHeaderItem}>Working hrs</Text>
        </View>
        {data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableRowItem}>{item.date}</Text>
            <Text style={styles.tableRowItem}>{item.checkIn}</Text>
            <Text style={styles.tableRowItem}>{item.checkOut}</Text>
            <Text style={styles.tableRowItem}>{item.workingHours}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    gap:5
  },
  filterButtonText: {
    fontSize: 14,
    marginRight: 8,
  },
  filterText: {
    fontSize: 16,
  },
  tableContainer: {
    paddingHorizontal: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  tableHeaderItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginLeft:-30,
    gap:15,
  },
  tableRowItem: {
    fontSize: 16
  },
});

export default AttendanceReport;



