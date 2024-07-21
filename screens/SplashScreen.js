import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the Google Sheet screen after the delay
      navigation.replace('loginScreen'); // Assuming you have a screen named 'GoogleSheetScreen'
    }, 2000); // Change the delay time as needed (2000 milliseconds = 2 seconds)

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      
      <Text style={styles.text}>Google Sheet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"#FFF"
  },
});

export default SplashScreen;
