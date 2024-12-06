import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import StatusDownloderScreen from './screens/StatusDownloderScreen';
import TabNavigator from './TabNavigator';
import Imagescreen from './screens/Imagescreen';
import VideoScreen from './screens/VideoScreen';
import SavedScreen from './screens/SavedScreen';




  const Stack = createNativeStackNavigator();

  const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='splashScreen'>

          <Stack.Screen name="splashScreen"  component={SplashScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="loginScreen"   component={LoginScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="status"   component={StatusDownloderScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="tab"   component={TabNavigator}  options={{ headerShown: false }}/>
          <Stack.Screen name="image"   component={Imagescreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="video"   component={VideoScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="save"   component={SavedScreen}  options={{ headerShown: false }}/>
         
          
      
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator