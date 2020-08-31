import 'react-native-gesture-handler';
import React, { Component } from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import TestScreen1 from './src/screens/testScreen1';
import Main from './src/screens/main';
import Achievements from './src/screens/achievements';
import Login from "./src/screens/login";
import TestScreen2 from "./src/screens/testScreen2";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();


export default class App extends Component {
  render() {

    return (
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name={"Home"} children={this.createHomeStack}/>
            <Drawer.Screen name={"Test Screen 2"} component={TestScreen2}/>
            <Drawer.Screen name={"Achievements"} component={Achievements}/>
          </Drawer.Navigator>
        </NavigationContainer>
    )
  }

    createHomeStack = () =>
        <Stack.Navigator>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Main"} component={Main}/>
            <Stack.Screen name={"Test 1"} component={TestScreen1}/>
        </Stack.Navigator>
}




