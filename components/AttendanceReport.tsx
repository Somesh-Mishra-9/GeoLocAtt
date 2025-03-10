import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { format } from 'date-fns';

interface AttendanceRecord {
  _id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  status: 'valid' | 'invalid';
  deviceInfo: string;
}

const AttendanceReport = () => {
  const [sort, setSort] = useState('Date');
  const [filter, setFilter] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAttendanceData = async () => {
    try {
      const user = auth().currentUser;
      const response = await fetch('YOUR_BACKEND_URL/api/attendance/history', {
        headers: {
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAttendanceData(data.data);
      } else {
        Alert.alert('Error', 'Failed to fetch attendance history');
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
      Alert.alert('Error', 'Failed to fetch attendance history');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAttendanceData();
  };

  const formatTime = (timestamp: string) => {
    return format(new Date(timestamp), 'HH:mm:ss');
  };

  const formatDate = (timestamp: string) => {
    return format(new Date(timestamp), 'dd/MM/yy');
  };

  const calculateWorkingHours = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

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
      </View>
      <ScrollView 
        style={styles.tableContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderItem}>Date</Text>
          <Text style={[styles.tableHeaderItem,{marginLeft:20}]}>Check-in</Text>
          <Text style={styles.tableHeaderItem}>Check-out</Text>
          <Text style={styles.tableHeaderItem}>Status</Text>
        </View>
        {attendanceData.map((item, index) => (
          <View key={item._id} style={styles.tableRow}>
            <Text style={styles.tableRowItem}>{formatDate(item.timestamp)}</Text>
            <Text style={styles.tableRowItem}>{formatTime(item.timestamp)}</Text>
            <Text style={styles.tableRowItem}>-</Text>
            <Text style={[
              styles.tableRowItem,
              item.status === 'valid' ? styles.validStatus : styles.invalidStatus
            ]}>
              {item.status === 'valid' ? 'Valid' : 'Invalid'}
            </Text>
          </View>
        ))}
        {attendanceData.length === 0 && (
          <Text style={styles.emptyText}>No attendance records found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  validStatus: {
    color: '#008000',
    fontWeight: 'bold',
  },
  invalidStatus: {
    color: '#ff0000',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default AttendanceReport;



