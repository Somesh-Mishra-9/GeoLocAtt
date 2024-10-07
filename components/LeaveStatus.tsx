import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import { CheckCircleIcon, ClockIcon, CloseIcon } from '@gluestack-ui/themed';

export default function LeaveStatus() {
  return (
    <View style={styles.leavesContainer}>
      <TouchableOpacity style={styles.leavesCard}>
        <View style={styles.cardHeading}>
        <ClockIcon size='xl'/>
        <Text style={[styles.headingText,{color:'black',fontWeight:'600'}]}>Pending</Text>
        </View>
        <Text style={styles.cardText}>Annual Leave</Text>
        <Text style={styles.cardDate}>From 23/09/24 to 27/09/24</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.leavesCard}>
        <View style={styles.cardHeading} >
        <CheckCircleIcon color='green' size='xl' />
        <Text style={[styles.headingText,{color:'green',fontWeight:'600'}]}>Approved</Text>
        </View>
        <Text style={styles.cardText}>Medical Leave</Text>
        <Text style={styles.cardDate}>From 12/08/24 to 14/08/24</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.leavesCard}>
        <View style={styles.cardHeading}>
        <CloseIcon color='red' size='xl' />
        <Text style={[styles.headingText,{color:'red',fontWeight:'600'}]}>Rejected</Text>
        </View>

        <Text style={styles.cardText} >Casual Leave</Text>
        <Text style={styles.cardDate}>From 05/08/24 to 08/08/24</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles=StyleSheet.create({
    leavesContainer:{
        padding:10,
    },
    leavesCard:{
        padding:10,
        // flex:1,
        alignItems:'center',
        backgroundColor:'#F9F9F9',
        marginVertical: 10,
        elevation:5,
        borderRadius:8,
        gap:8,
    },
    cardHeading:{
        // flex:1,
        flexDirection:'row',
        gap:5,
        alignItems:'center'
    }
    ,
    headingText:{
        fontSize:24,
        // color:'green'
    },
    cardText:{
        fontSize:20,
    },
    cardDate:{
        fontSize:16,
    }


})

