import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign"
import axios from 'axios';
// const connection = require("../db")

const GoogleSheet = () => {

  const navigation = useNavigation();

  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.18.104:1348/api/tenthstud');
      const jsonData = await response.json();
      setData(jsonData);

      console.log("Data", data);
    } catch (error) {
      console.error(error);
    }
  };

  

  


  
  

  // Function to fetch data from the database
// const fetchData = () => {
//   return new Promise((resolve, reject) => {
//     connection.query('SELECT * FROM graphData', (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

// // Usage example
// fetchData().then(results => {
//   console.log(results); // Do something with the fetched data
// }).catch(error => {
//   console.error(error);
// });

//   useEffect(() => {
//     fetchData(); // Initial fetch

//     // Polling mechanism to fetch data every 30 seconds
//     const interval = setInterval(() => {
//       fetchData();
//     }, 3000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   const fetchData = async () => {
//     try {
//       const spreadsheetId = '1afPl-_PqFI0k8R-BtaP1UA9sjRjvBMCSvwFUR7ZBskw'; // Extracted from URL
//       const sheetName = 'UserData'; // Replace 'UserData' with the name of your sheet
//       const apiKey = 'AIzaSyAJkVFPFmBgXe-V_nM09p2wBY2hPH7u31s'; // Replace 'YOUR_API_KEY' with your actual API key

//       const response = await axios.get(
//         `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`
//       );

//       // Assuming the response data is in JSON format
//       setSheetData(response.data.values);

//       setLoading(false); // Data loaded, set loading to false
//     } catch (error) {
//       if (error.response && error.response.status === 429) {
//         console.error('Too many requests. Retrying in 5 seconds...');
//         // Retry the request after waiting for 5 seconds
//         setTimeout(fetchData, 5000);
//       } else if (error.response && error.response.status === 403) {
//         console.error('Access to Google Sheets API is forbidden. Check API key permissions and spreadsheet access.');
//       } else {
//         console.error('Error fetching data:', error);
//       }
//     }
//   };

//   const renderHeader = () => (
//     <View style={{ flexDirection: "row" }}>
//       {sheetData[0].map((cell, cellIndex) => (
//         <Text style={{ color: "black", fontSize: 15, fontWeight: "900", margin: 40, top: 40 }} key={cellIndex}>{cell}</Text>
//       ))}
//     </View>
//   );

//   const renderItem = ({ item, index }) => (

//     <View style={{ flexDirection: "row", marginTop: 15, backgroundColor: "#E0E0E0", padding: 10, justifyContent: "space-evenly" }}>
//       {item.map((cell, cellIndex) => (
//         <Text style={{ color: "black", fontSize: 15, fontWeight: "400", margin: 5, left: 10, right: 15, }} key={cellIndex}>
//           {cell}
//         </Text>
      
// ))}
//     </View>

//   );

  return (


    <View style={{ flex: 1,backgroundColor:"white"}}>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style = {{alignSelf:"center",marginVertical:10,width:"80%",height:80,backgroundColor:"gray",alignItems:"center",top:"10%"}}>
          <Text style = {{color:"white"}}>{`ID: ${item.id}`}</Text>
          <Text style = {{color:"white"}}>{`Name: ${item.name}`}</Text>
          <Text style = {{color:"white"}}>{`Age: ${item.age}`}</Text>
          <Text style = {{color:"white"}}>{`Address: ${item.address}`}</Text>
        </View>

      )}
     
    />
  </View>
  
   
    // <View style={styles.container}>
    //   <View style={{ width: "100%", height: "100%" }}>

    //     <View style={{ top: 30, height: 60 }}>

    //       <View style={{ flexDirection: "row", top: 20 }}>
    //         <TouchableOpacity style={{ left: 35 }} onPress={() => navigation.navigate("loginScreen")}>
    //           <AntDesign name = "caretleft" size = {28} color = {"black"}/>
    //         </TouchableOpacity>
    //         <Text style={{ fontSize: 20, fontWeight: "900", color: "#006600", left: 90 }}> Google Sheet Data</Text>
    //       </View>
    //     </View>

    //     {loading ? (
    //       <Text style={{ fontSize: 15, fontWeight: "600", color: "black", textAlign: "center", top: 60 }}>Loading...</Text>
    //     ) : (
    //       <ScrollView horizontal>
    //         <FlatList
    //           data={sheetData.slice(1)} // Exclude the header row
    //           ListHeaderComponent={renderHeader}
    //           renderItem={renderItem}
    //           keyExtractor={(item, index) => index.toString()}
    //         />
    //       </ScrollView>
    //     )}
    //   </View>
    // </View>
  )
}

export default GoogleSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",

  }
});
