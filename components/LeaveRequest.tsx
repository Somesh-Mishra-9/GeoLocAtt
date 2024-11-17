


import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker'; // New Date Picker import

import {
  CalendarDaysIcon,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  VStack,
} from '@gluestack-ui/themed';
import {Icon, SelectPortal, SelectItem} from '@gluestack-ui/themed';
import {ChevronDownIcon, SelectDragIndicator, Select, SelectIcon, SelectInput, SelectTrigger, Switch, View} from '@gluestack-ui/themed';
import { CircleIcon } from '@gluestack-ui/themed';

// Function for SelectManager
const SelectManager = () => {
  return (
    <Select>
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder="Select option" />
        <SelectIcon mr="$3">
          <Icon as={ChevronDownIcon} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="Manager-1" value="Manager-1" />
          <SelectItem label="Manager-2" value="Manager-2" />
          <SelectItem label="Manager-3" value="Manager-3" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

// Function for RadioButtons
function RadioButtons(){
  const [values, setValues] = React.useState("med")
  return (
    <RadioGroup value={values} onChange={setValues}>
      <VStack space="sm">
        <Radio value="med">
          <RadioIndicator>
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>
          <RadioLabel marginStart={8}>Medical Leave</RadioLabel>
        </Radio>
        <Radio value="cas">
          <RadioIndicator>
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>
          <RadioLabel marginStart={8}>Casual Leave</RadioLabel>
        </Radio>
        <Radio value="ann">
          <RadioIndicator >
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>
          <RadioLabel marginStart={8}>Annual Leave</RadioLabel>
        </Radio>
      </VStack>
    </RadioGroup>
  );
}

// Main LeaveRequest component
const LeaveRequest = () => {
  const [manager, setManager] = useState('');
  const [medicalLeave, setMedicalLeave] = useState(false);
  const [casualLeave, setCasualLeave] = useState(false);
  const [annualLeave, setAnnualLeave] = useState(false);
  const [message, setMessage] = useState('');

  const [toDate, setToDate] = useState(new Date());
  const [toShow, setToShow] = useState(false);

  const [fromDate, setFromDate] = useState(new Date());
  const [fromShow, setFromShow] = useState(false);

  const handleManagerChange = text => setManager(text);
  const handleFromDateChange = text => setFromDate(text);
  const handleToDateChange = text => setToDate(text);

  const handleSubmit = () => {
    console.log('Submitted data:', {
      manager,
      fromDate,
      toDate,
      medicalLeave,
      casualLeave,
      annualLeave,
      message,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply for Leave</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Manager</Text>
        <SelectManager setManager={setManager} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Leave Duration</Text>
        <Text>From</Text>
        <View style={styles.dateContainer}>
          <TextInput
            style={styles.dateInput}
            value={fromDate.toDateString()}
            onChangeText={handleFromDateChange}
            placeholder={` ${fromDate.getDate()}-${fromDate.getMonth() + 1}-${fromDate.getFullYear()}`}
          />
          <TouchableOpacity onPress={() => setFromShow(true)}>
            <CalendarDaysIcon />
          </TouchableOpacity>
        </View>

        {fromShow && (
          <DatePicker
            modal
            mode="date"
            open={fromShow}
            date={fromDate}
            onConfirm={(date) => {
              setFromShow(false);
              setFromDate(date);
            }}
            onCancel={() => setFromShow(false)}
          />
        )}

        <Text>To</Text>
        <View style={styles.dateContainer}>
          <TextInput
            style={styles.dateInput}
            value={toDate.toDateString()}
            onChangeText={handleToDateChange}
            placeholder={` ${toDate.getDate()}-${toDate.getMonth() + 1}-${toDate.getFullYear()}`}
          />
          <TouchableOpacity onPress={() => setToShow(true)}>
            <CalendarDaysIcon />
          </TouchableOpacity>
        </View>

        {toShow && (
          <DatePicker
            modal
            mode="date"
            open={toShow}
            date={toDate}
            onConfirm={(date) => {
              setToShow(false);
              setToDate(date);
            }}
            onCancel={() => setToShow(false)}
          />
        )}
      </View>

      <Text style={styles.label}>Type of Leave</Text>
      <View style={styles.radioButtonsContainer}>
        <RadioButtons/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Message for Management (Optional)</Text>
        <TextInput
          style={styles.messageInput}
          multiline
          value={message}
          onChangeText={setMessage}
          placeholder="Enter your message..."
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
    gap: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingEnd: 10,
    paddingStart: 10,
    borderRadius: 5,
  },
  dateInput: {
    flex: 1,
    marginRight: 10,
  },
  radioButtonsContainer: {
    padding: 10,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical:'top',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LeaveRequest;
