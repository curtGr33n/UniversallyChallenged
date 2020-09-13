import React, { Component } from 'react';
import {View, Text } from 'react-native';

//This is how you import the style sheet
import { styles, buttons } from '../styles/styles.js'
import {TouchableOpacity,TouchableHighlight, Image}  from "react-native";


class Library extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/top.png')} />
                <Image style={styles.logoText} source={require('../assets/bottom.png')} />
            </View>
        )
    }
}

export default Library;
