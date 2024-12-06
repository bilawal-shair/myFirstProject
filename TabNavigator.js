import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Number from "./assets/Number.svg"
import Imagescreen from './screens/Imagescreen';
import VideoScreen from './screens/VideoScreen';
import SavedScreen from './screens/SavedScreen';



const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  return (
    <Tab.Navigator
      initialRouteName="image"

      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2B91DB',
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIconStyle: { marginBottom: -10 }, // Adjust as needed
      }}

    >
      <Tab.Screen
        name="image"
        component={Imagescreen}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={25} />
            // <HomeIcon color={color} width={size} height={size} />
          ),
        }}
      />
      <Tab.Screen
        name="video"
        component={VideoScreen}
        options={{
          tabBarLabel: 'EXPLORE',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="location-dot" color={color} size={21} />
            //  <ExploreIcon color={color} width={size} height={size} />
          ),
        }}
      />
      <Tab.Screen
        name="saved"
        component={SavedScreen}
        options={{
          tabBarLabel: 'MY BOOKING',
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: 'relative' }}>
              {/* <Booking color={color} size={30} /> */}
              <MaterialIcons name="bookmark" color={color} size={24} />
              {/* NumberBack positioned on top right */}
              <View style={{ position: 'absolute', top: -3, right: 0, left: 10 }}>
                <Number />
                {/* Display your number here */} 
                 <Text style={{ color: 'white', position: "absolute", fontSize: 12, fontWeight: "900", top: -3, left: 3 }}>1</Text>
              </View>
            </View>
          ),
        }}
      />
     
    </Tab.Navigator>
  )
}

export default TabNavigator