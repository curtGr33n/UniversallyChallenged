import React, { Component } from 'react';
import {View, Text} from 'react-native';

//This is how you import the style sheet styles
// If another stylesheet is wanted add it with a , separator
// import {styles, another, more, soManyStyles} from ...
import {styles} from '../styles/styles'

const Main = () =>
    <View style={styles.center}>
        <Text style={styles.title}>Main</Text>
    </View>


export default Main;
