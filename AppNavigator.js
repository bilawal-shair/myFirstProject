import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoogleSheet from './screens/GoogleSheet';
import SplashScreen from './screens/SplashScreen';
import InputInSheet from './screens/InputInSheet';
import LoginScreen from './screens/LoginScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='splashScreen'> 
         <Stack.Screen name="splashScreen"  component={SplashScreen}  options={{ headerShown: false }}/>
         <Stack.Screen name="loginScreen"   component={LoginScreen}  options={{ headerShown: false }}/>
         <Stack.Screen name="inputInSheet"  component={InputInSheet}  options={{ headerShown: false }}/>
         <Stack.Screen name="googleSheet"   component={GoogleSheet}  options={{ headerShown: false }}/>
       </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator