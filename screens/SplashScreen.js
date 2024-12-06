import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import LoginLogo from "../assets/LoginLogo.svg"

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the Google Sheet screen after the delay
      navigation.replace('status'); // Assuming you have a screen named 'GoogleSheetScreen'
    }, 2000); // Change the delay time as needed (2000 milliseconds = 2 seconds)

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>

      {/* <LoginLogo/> */}
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKimsLvTitGNjXhbytt4yhhqnejgi_x4l9g&s' }}
        style={{width:100,height:100,borderRadius:20}}
        resizeMode="cover"
      />
      
      <Text style={[styles.text,{top:"3%"}]}>Status Saver</Text>
      <Text style={[styles.text1,{top:"3%"}]}>Save Your Favorite Media</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"#fff"
  },
  text1: {
    fontSize: 14,
    fontWeight: '600',
    color:"#fff"
  },
});

export default SplashScreen;
