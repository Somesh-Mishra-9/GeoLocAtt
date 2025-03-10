import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DrawerContent = ({ drawer }) => {
    return (
        <View style={styles.drawerContainer}>
            <View style={styles.profileContainer}>
                <Text style={styles.profileName}>User Name</Text>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.navItem} onPress={() => drawer.current.closeDrawer()}>
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => drawer.current.closeDrawer()}>
                <Text style={styles.navText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => drawer.current.closeDrawer()}>
                <Text style={styles.navText}>Attendance Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => drawer.current.closeDrawer()}>
                <Text style={styles.navText}>Leave Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => drawer.current.closeDrawer()}>
                <Text style={styles.navText}>Leave Status</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => drawer.current.closeDrawer()}>
                <Text style={styles.navText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
    navItem: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
    },
    navText: {
        fontSize: 16,
        color: '#333',
    },
});

export default DrawerContent;