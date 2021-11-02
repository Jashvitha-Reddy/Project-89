import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLoginScreen from './screens/SignupLoginScreen';
import ExchangeScreen from './screens/ExchangeScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/Settings Screen';
import customSideBarMenu from './component/customSideBarMenu';
import {createBottomTabNavigator, createTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import MyBarters from './component/MyBarters';
import MyReceivedItemsScreen from './screens/MyReceivedItemsScreen';


export default function App() {
  return (
    
      <SignupLoginScreen/>
   
  );
}


const Navigator=createBottomTabNavigator({
  ExchangeScreen:{screen:ExchangeScreen},
  HomeScreen:{screen:HomeScreen},
})

const AppDrawerNavigator=createDrawerNavigator({
  Home:{
    screen:createTabNavigator
  },
  Settings:{
    screen:SettingsScreen
  },
  MyBarters:{
    component:MyBarters
  },
  {
    contentComponent:customSideBarMenu
  },
  {
    intialRouteName:"Home"
  }
})


// const styles = StyleSheet.create({
  // container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  // },
// });
