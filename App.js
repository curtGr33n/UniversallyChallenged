import 'react-native-gesture-handler';
import React, { Component } from 'react';

//Screen class
import Main from './src/screens/main';
import WelcomeScreen from "./src/screens/welcomeScreen";
import Login from "./src/screens/login";
import Library from "./src/screens/library";
import Pages from "./src/screens/pages";

//Screen const
import TestScreen2 from "./src/screens/testScreen2";
import TestScreen1 from './src/screens/testScreen1';
import Draw from "./src/screens/testScreen1"

import Tab1 from "./src/screens/tabs/tab1"
import Tab2 from "./src/screens/tabs/tab2"
import Tab3 from "./src/screens/tabs/tab3"

// Navigation types
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

// Navigation containers
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
          </Drawer.Navigator>
        </NavigationContainer>

    )
  }

  // Any seperate functions keep out side of the render() method

    createHomeStack = () =>
        <Stack.Navigator>
            <Stack.Screen
                name={"WelcomeScreen"}
                component={WelcomeScreen}
                options={{
                  headerShown: false
                }}
            />
            <Stack.Screen
                name={"Login"}
                component={Login}
                options={{
                    title: '',
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
                name={"Library"}
                component={Library}
                options={{
                    title: 'Library',
                    headerStyle: { backgroundColor: 'orange'},
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen
                name={"Pages"}
                component={Pages}
                options={{
                    title: 'Pages',
                    headerStyle: { backgroundColor: 'orange'},
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen
                name={"Test 1"}
                //component={TestScreen1}
                component={Draw}
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
                                           tabBarLabel: 'Waggle'
                                       }}/>
            <MaterialBottomTabs.Screen name={"Tab 2"} component = {Tab2}/>
            <MaterialBottomTabs.Screen name={"Tab 3"} component = {Tab3}/>
        </MaterialBottomTabs.Navigator>
    }

}

