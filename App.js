import 'react-native-gesture-handler';
import React, { Component } from 'react';

//Screen class
import Main from './src/screens/main';
import Login from "./src/screens/login";

//Screen const
import Achievements from './src/screens/achievements';
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

// React native components
import { Image, View } from 'react-native'

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
            <Drawer.Screen name={"Achievements"} component={Achievements}/>
          </Drawer.Navigator>
        </NavigationContainer>
    )
  }

  // Set logo image for each page
  setLogo = () =>
      < View style={{ flexDirection: 'row' }} >
         <Image
            style={{
                width: 350,
                height: 100,
                marginLeft: 15,
            }}
            source={require('./src/images/logo.png')}
         />
     </View>

  // Any seperate functions keep out side of the render() method
    createHomeStack = () =>
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fdda64',
                    height: 150,
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name={"Login"}
                component={Login}
                options={{
                    headerTitle: this.setLogo
                }}
            />
            <Stack.Screen
                name={"Main"}
                component={Main}
                options={{
                    headerTitle: this.setLogo
                }}/>
            <Stack.Screen
                name={"Test 1"}
                // component={TestScreen1}
                component={Draw}
                options={{
                    headerTitle: this.setLogo
                }}
            />
            {/*<Stack.screen*/}
            {/*    name={"Draw Function"}*/}
            {/*    component={Draw}*/}
            {/*    options={{*/}
            {/*        title: 'Draw Function',*/}
            {/*        headerStyle: {backgroundColor: 'Orange'},*/}
            {/*        headerTintColor: 'white'*/}
            {/*    }}*/}
            {/*/>*/}
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

