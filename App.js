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
import addCreatorForm from "./src/components/AddCreatorForm";
import CreateBookForm from "./src/components/CreateBookForm";

//Screen const
import Test from "./src/screens/test";
import Draw from "./src/components/draw";


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
          </Drawer.Navigator>
        </NavigationContainer>
    )
  }

  // Set logo image for each page
  setLogo = () =>
      <View style={{ flexDirection: 'row' }} >
         <Image
            style={{
                width: 380,
                height: 100,
                marginLeft: 15,
            }}
            source={require('./src/screens/images/logo.png')}
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
                    <Icon style={{ paddingRight: 50 }}
                          name='home'
                          size={80}
                          type='font-awesome'
                          color='white'
                          onPress={() => navigation.navigate('Main')}
                    />
                    <Icon
                          name='cog'
                          size={80}
                          type='font-awesome'
                          color='white'
                          onPress={() => navigation.navigate('Settings')}
                    />
                </View>),
                headerLeft: null
        }}>
            <Stack.Screen
                name={"Login"}
                component={Login}
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
                name={"Test"}
                component={Test}
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
                name={"CreateBookForm"}
                component={CreateBookForm}
                options={{
                    headerTitle: this.setLogo
                }}/>
            <Stack.Screen
                name={"addCreatorForm"}
                component={addCreatorForm}
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
                name={"WelcomeScreen"}
                component={WelcomeScreen}
                options={{
                    headerTitle: this.setLogo
                }}/>
        </Stack.Navigator>
}

