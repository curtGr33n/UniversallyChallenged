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
import Tab1 from "./src/screens/tabs/tab1"
import Tab2 from "./src/screens/tabs/tab2"
import Tab3 from "./src/screens/tabs/tab3"


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
            <Stack.Screen
                name={"Login"}
                component={Login}
                options={{
                    title: 'Login Page',
                    headerStyle: { backgroundColor: 'orange'},
                    headerTintColor: 'white'
                }}
            />
            <Stack.Screen
                name={"Main"}
                component={Main}
                options={{
                    title: 'Main',
                    headerStyle: { backgroundColor: 'orange'},
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen
                name={"Test 1"}
                component={TestScreen1}
                options={{
                    title: 'Test 1',
                    headerStyle: { backgroundColor: 'orange'},
                    headerTintColor: 'white'
                }}
            />
            <Stack.Screen
                name={"Bottom Tabs"}
                children={this.createBottomTabs}
                options={{
                    title: 'Bottom Tabs',
                    headerStyle: { backgroundColor: 'orange'},
                    headerTintColor: 'white'
                }}
            />
            <Stack.Screen
                name={"Top Tabs"}
                children={this.createTopTabs}
                options={{
                    title: 'Top Tabs',
                    headerStyle: { backgroundColor: 'orange'},
                    headerTintColor: 'white'
                }}
            />
        </Stack.Navigator>

    createTopTabs = () => {
        return <MaterialTopTabs.Navigator>
            <MaterialTopTabs.Screen
                name={"Tab 1"}
                component = {Tab1}

            />
            <MaterialTopTabs.Screen name={"Tab 2"} component = {Tab2}/>
            <MaterialTopTabs.Screen name={"Tab 3"} component = {Tab3}/>
        </MaterialTopTabs.Navigator>
    }

    createBottomTabs = () => {
        return <MaterialBottomTabs.Navigator>
            <MaterialBottomTabs.Screen name={"Tab 1"}
                                       component = {Tab1}
                                       options={{
                                           tabBarLabel: 'Waggle',
                                           tabBarIcon: () => (
                                               <Icon style={[{ color: 'black' }]}
                                                     size={25}
                                                     name={'home'} />
                                           ),
                                       }}/>
            <MaterialBottomTabs.Screen name={"Tab 2"} component = {Tab2}/>
            <MaterialBottomTabs.Screen name={"Tab 3"} component = {Tab3}/>
        </MaterialBottomTabs.Navigator>
    }
}




