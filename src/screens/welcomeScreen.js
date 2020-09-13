import React, { Component } from 'react';
import {View, Text } from 'react-native';

//This is how you import the style sheet
import { styles, buttons } from '../styles/styles.js'
import {TouchableOpacity,TouchableHighlight, Image}  from "react-native";


class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/top.png')} />
                <Image style={styles.logoText} source={require('../assets/bottom.png')} />
                <TouchableHighlight style={buttons.primary}
                                    onPress={() => this.props.navigation.navigate('Main')}
                >
                    <Text style={buttons.buttonText}>Login</Text>

                </TouchableHighlight>
                <TouchableOpacity style={buttons.secondary}
                                  onPress={() => this.props.navigation.navigate('Test 1')}
                >
                    <Text style={buttons.buttonText}>Instructions</Text>

                </TouchableOpacity>
            </View>
        )
    }
}

export default Login;
