import React, { Component } from 'react';
import {View, Text } from 'react-native';

//This is how you import the style sheet
import { styles, buttons } from '../styles/styles.js'
import {TouchableOpacity,TouchableHighlight}  from "react-native";


class Login extends Component {
        render() {
                return (
                <View style={styles.center}>
                        <Text style={styles.title}>Login</Text>
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate('Main')}
                        >
                                <View style={buttons.primary}>
                                        <Text style={buttons.buttonText}>Main</Text>
                                </View>
                        </TouchableHighlight>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Test 1')}
                        >
                                <View style={buttons.primary}>
                                        <Text style={buttons.buttonText}>Test 1</Text>
                                </View>
                        </TouchableOpacity>
                </View>
                )
        }
}

export default Login;
