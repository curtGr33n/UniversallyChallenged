import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';

//Screen class
import Main from './src/screens/main';
import WelcomeScreen from "./src/screens/welcomeScreen";
import Login from "./src/screens/login";
import Library from "./src/screens/library";
import Pages from "./src/screens/pages";
import Teacher from "./src/screens/teacher";
import Settings from "./src/screens/settings";
import SplashScreen from "./src/screens/splashScreen";
import addBook from "./src/screens/addBook";
import editBook from "./src/screens/editBook";

//Screen const
import Draw from "./src/components/draw";


// Navigation types
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';


// React native components
import { Image, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

// Navigation containers
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name={"Home"} children={this.createHomeStack}/>
          </Drawer.Navigator>
        </NavigationContainer>
    )
  }

  // Set logo image for each page
  setLogo = () =>
      <View style={{ flexDirection: 'row' }} >
         <Image
            style={{
                width: 500,
                height: 300,
                aspectRatio: 1,
                resizeMode: 'contain'
            }}
            source={require('./src/assets/images/logo.png')}
         />
     </View>

  // Any separate functions keep out side of the render() method
    createHomeStack = ({ navigation }) =>
        <Stack.Navigator
            screenOptions = {{
                headerStyle: {
                    backgroundColor: '#fdda64',
                    height: 150,
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitle: this.setLogo,
                headerRight: () => (< View style={{ flexDirection: 'row', padding: 20 }} >
                    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                        <Image source={require('./src/assets/images/home.png')}
                               style={{
                                   width: 90,
                                   height: 80,
                               }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Image source={require('./src/assets/images/settings.png')}
                               style={{
                                   width: 90,
                                   height: 90,
                                   marginLeft: 25,
                               }}/>
                    </TouchableOpacity>
                </View>),
                headerLeft: null
        }}>
            <Stack.Screen
                name={"SplashScreen"}
                component={SplashScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"Login"}
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"Main"}
                component={Main}
                />
            <Stack.Screen
                name={"Draw"}
                component={Draw}
            />
            <Stack.Screen
                name={"Library"}
                component={Library}
                options={{
                    headerTitle: this.setLogo
            }}/>
            <Stack.Screen
                name={"Teacher"}
                component={Teacher}
            />
            <Stack.Screen
                name={"Pages"}
                component={Pages}
                options={{
                    headerTitle: this.setLogo
            }}/>
            <Stack.Screen
                name={"Settings"}
                component={Settings}
                options={{
                    headerTitle: this.setLogo
                }}/>
            <Stack.Screen
                name={"addBook"}
                component={addBook}
                options={{
                    headerTitle: this.setLogo
                }}/>
            <Stack.Screen
                name={"editBook"}
                component={editBook}
                options={{
                    headerTitle: this.setLogo
                }}/>
            <Stack.Screen
                name={"WelcomeScreen"}
                component={WelcomeScreen}
                options={{
                    headerTitle: this.setLogo
                }}/>
        </Stack.Navigator>
}

