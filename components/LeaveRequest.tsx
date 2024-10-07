// import {
//   CalendarDaysIcon,

//   Radio,

//   RadioGroup,

//   RadioIcon,

//   RadioIndicator,

//   RadioLabel,

//   SelectBackdrop,
//   SelectContent,
//   SelectDragIndicatorWrapper,
//   VStack,
// } from '@gluestack-ui/themed';
// import {Icon, SelectPortal} from '@gluestack-ui/themed';
// import {SelectItem} from '@gluestack-ui/themed';
// import {ChevronDownIcon} from '@gluestack-ui/themed';
// import {SelectDragIndicator} from '@gluestack-ui/themed';
// import {
//   Select,
//   SelectIcon,
//   SelectInput,
//   SelectTrigger,
//   Switch,
//   View,
// } from '@gluestack-ui/themed';
// import React, {useState} from 'react';
// import {StyleSheet, Text, TouchableOpacity} from 'react-native';
// import {TextInput} from 'react-native-gesture-handler';

// import DateTimePicker from '@react-native-community/datetimepicker';
// import { CheckboxIcon } from '@gluestack-ui/themed';
// import { CheckIcon } from '@gluestack-ui/themed';
// import { CircleIcon } from '@gluestack-ui/themed';

// // import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';

// // const RadioButtons = () => {
// //   const [value, setValue] = React.useState("one");
// //   return <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
// //     setValue(nextValue);
// //   }}>
// //       <Radio value="one" my={1}>
// //         One
// //       </Radio>
// //       <Radio value="two" my={1}>
// //         Two
// //       </Radio>
// //     </Radio.Group>;
// // };

// const SelectManager = () => {
//   return (
//     <Select>
//       <SelectTrigger variant="outline" size="md">
//         <SelectInput placeholder="Select option" />
//         <SelectIcon mr="$3">
//           <Icon as={ChevronDownIcon} />
//         </SelectIcon>
//       </SelectTrigger>
//       <SelectPortal>
//         <SelectBackdrop />
//         <SelectContent>
//           <SelectDragIndicatorWrapper>
//             <SelectDragIndicator />
//           </SelectDragIndicatorWrapper>
//           <SelectItem label="Manager-1" value="Manager-1" />
//           <SelectItem label="Manager-2" value="Manager-2" />
//           <SelectItem label="Manager-3" value="Manager-3" />
//         </SelectContent>
//       </SelectPortal>
//     </Select>
//   );
// };



// function RadioButtons(){
//   const [values, setValues] = React.useState("med")
//   return (
//     <RadioGroup value={values} onChange={setValues}>
//       <VStack space="sm">
//         <Radio value="med">
//           <RadioIndicator>
//             <RadioIcon as={CircleIcon} />
//           </RadioIndicator>
//           <RadioLabel marginStart={8}>Medical Leave</RadioLabel>
//         </Radio>
//         <Radio value="cas">
//           <RadioIndicator>
//             <RadioIcon as={CircleIcon} />
//           </RadioIndicator>
//           <RadioLabel marginStart={8}>Casual Leave</RadioLabel>
//         </Radio>
//         <Radio value="ann">
//           <RadioIndicator >
//             <RadioIcon as={CircleIcon} />
//           </RadioIndicator>
//           <RadioLabel marginStart={8}>Annual Leave</RadioLabel>
//         </Radio>
//       </VStack>
//     </RadioGroup>
//     )
// }

// const LeaveRequest = () => {
//   const [manager, setManager] = useState('');
//   const [medicalLeave, setMedicalLeave] = useState(false);
//   const [casualLeave, setCasualLeave] = useState(false);
//   const [annualLeave, setAnnualLeave] = useState(false);
//   const [message, setMessage] = useState('');

//   const [toDate, setToDate] = useState(new Date());
//   const [toMode, setToMode] = useState('date');
//   const [toShow, setToShow] = useState(false);

//   const [fromDate, setFromDate] = useState(new Date());
//   const [fromMode, setFromMode] = useState('date');
//   const [fromShow, setFromShow] = useState(false);

//   const onChangeTo = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     setToShow(false);
//     setToDate(currentDate);
//   };

//   const showToMode = currentMode => {
//     setToShow(true);
//     setToMode(currentMode);
//   };

//   const showToDatepicker = () => {
//     showToMode('date');
//   };

//   const onChangeFrom = (event, selectedDate) => {
//     const currentFromDate = selectedDate;
//     setFromShow(false);
//     setFromDate(currentFromDate);
//   };

//   const showFromMode = currentMode => {
//     setFromShow(true);
//     setFromMode(currentMode);
//   };

//   const showFromDatepicker = () => {
//     showFromMode('date');
//   };

//   const handleManagerChange = text => {
//     setManager(text);
//   };

//   const handleFromDateChange = text => {
//     setFromDate(text);
//   };

//   const handleToDateChange = text => {
//     setToDate(text);
//   };

//   const handleSubmit = () => {
//     // Handle submit logic here, send data to server or perform any other actions
//     console.log('Submitted data:', {
//       manager,
//       fromDate,
//       toDate,
//       medicalLeave,
//       casualLeave,
//       annualLeave,
//       message,
//     });
//   };



//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Apply for Leave</Text>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Your Manager</Text>
//         <SelectManager setManager={setManager} />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Leave Duration</Text>
//         <Text>From</Text>
//         <View style={styles.dateContainer}>
//           <TextInput
//             style={styles.dateInput}
//             value={fromDate.toDateString()}
//             onChangeText={handleFromDateChange}
//             placeholder={` ${fromDate.getDate()}-${
//               fromDate.getMonth() + 1
//             }-${fromDate.getFullYear()}`}
//           />
//           <TouchableOpacity onPress={showFromDatepicker}>
//             <CalendarDaysIcon />
//           </TouchableOpacity>
//         </View>
//         {fromShow && (
//           <DateTimePicker
//             testID="dateTimePicker1"
//             value={fromDate}
//             mode="date"
//             is24Hour={true}
//             onChange={onChangeFrom}
//           />
//         )}
//         <Text>To</Text>
//         <View style={styles.dateContainer}>
//           <TextInput
//             style={styles.dateInput}
//             value={toDate.toDateString()}
//             onChangeText={handleToDateChange}
//             placeholder={` ${toDate.getDate()}-${
//               toDate.getMonth() + 1
//             }-${toDate.getFullYear()}`}
//           />
//           <TouchableOpacity onPress={showToDatepicker}>
//             <CalendarDaysIcon />
//           </TouchableOpacity>
//         </View>
//         {toShow && (
//           <DateTimePicker
//             testID="dateTimePicker2"
//             value={toDate}
//             mode="date"
//             is24Hour={true}
//             onChange={onChangeTo}
//           />
//         )}
//       </View>

//       <Text style={styles.label}>Type of Leave</Text>

//       <View style={styles.radioButtonsContainer}>
//         <RadioButtons/>
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Message for Management (Optional)</Text>
//         <TextInput
//           style={styles.messageInput}
//           multiline
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Enter your message..."
//         />
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     marginBottom: 15,
//     gap: 10,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 0,
//     paddingEnd: 10,
//     paddingStart: 10,
//     borderRadius: 5,
//   },
//   dateInput: {
//     flex: 1,
//     marginRight: 10,
//   },
//   radioButtonsContainer: {
//     padding: 10,
//   },
//   messageInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//     height: 100,
//     textAlignVertical:'top',
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default LeaveRequest;


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
