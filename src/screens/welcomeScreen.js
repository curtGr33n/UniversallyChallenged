import React, { Component } from 'react';
import {View, Text } from 'react-native';

//This is how you import the style sheet
import { styles, buttons } from '../styles/styles.js'
import {TouchableOpacity,TouchableHighlight, Image}  from "react-native";


class WelcomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/top.png')} />
                <Image style={styles.logoText} source={require('../assets/bottom.png')} />
                <TouchableHighlight style={buttons.primary}
                                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <Text style={buttons.buttonText}>Login</Text>

                </TouchableHighlight>
                <TouchableOpacity style={buttons.secondary}
                                  onPress={() => this.props.navigation.navigate('Main')}
                >
                    <Text style={buttons.buttonText}>Skip to Main</Text>

                </TouchableOpacity>
            </View>
        )
    }
}

export default WelcomeScreen;
