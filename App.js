// App.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './AppNavigator';


function App() {
  
  return (

    <AppNavigator />
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
