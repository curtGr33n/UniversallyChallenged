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
import Draw from "./src/screens/Draw";


// Navigation types
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

// React native components
import { Image, View } from 'react-native'
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
            <Drawer.Screen name={"Test Screen 2"} component={TestScreen2}/>
            <Drawer.Screen name={"Draw Test"} component={Draw}/>
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
                headerRight: () => (< View style={{ flexDirection: 'row' }} >
                    <Icon style={{ paddingRight: 50 }}
                          name='home'
                          size={80}
                          type='font-awesome'
                          color='white'
                          onPress={() => navigation.navigate('Main')}
                    />
                    <Icon style={{ paddingRight: 80 }}
                          name='cog'
                          size={80}
                          type='font-awesome'
                          color='white'
                          onPress={() => navigation.navigate('Main')}
                    />
                </View>),
                headerLeft: null
            }}
        >
            <Stack.Screen
                name={"Login"}
                component={Login}
            />
            <Stack.Screen
                name={"Main"}
                component={Main}
                />
            <Stack.Screen
                name={"Test 1"}
                // component={TestScreen1}
                component={Draw}
            />
        </Stack.Navigator>
}

