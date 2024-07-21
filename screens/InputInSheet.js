import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';


const InputInSheet = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');

  // const handleSubmit = async () => {
  //   try {
  //     const spreadsheetId = '1afPl-_PqFI0k8R-BtaP1UA9sjRjvBMCSvwFUR7ZBskw'; // Extracted from URL
  //     const sheetName = 'UserData'; // Replace 'UserData' with the name of your sheet
  //     const apiKey = 'AIzaSyAJkVFPFmBgXe-V_nM09p2wBY2hPH7u31s'; // Replace 'YOUR_API_KEY' with your actual API key

  //     // Prepare the data to be sent to Google Sheets
  //     const rowData = [name, email, phoneNumber];
  //     const data = {
  //       values: [rowData]
  //     };

  //     // Send the data to Google Sheets
  //     await axios.post(
  //       `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}:append?valueInputOption=RAW&key=${apiKey}`,
  //       data
  //     );

  //     // Reset form fields after successful submission
  //     setName('');
  //     setEmail('');
  //     setPhoneNumber('');
  //   } catch (error) {
  //     console.error('Error sending data to Google Sheets:', error);
  //   }
  // };

  return (
    <View>
      
    </View>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Enter Data</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Name"
    //     value={name}
    //     onChangeText={setName}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Email"
    //     value={email}
    //     onChangeText={setEmail}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Phone Number"
    //     value={phoneNumber}
    //     onChangeText={setPhoneNumber}
    //   />
    //   <Button title="Submit" onPress={handleSubmit} />
    // </View>
  );
};

export default InputInSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    paddingHorizontal: 10
  }
});
