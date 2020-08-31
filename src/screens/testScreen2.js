import React, { Component } from 'react';
import {View, Text } from 'react-native';

//This is how you import the style sheet
import { styles } from '../styles/styles.js'

const TestScreen2 = () =>
    <View style={styles.center}>
        <Text style={styles.title}>Test screen number 2</Text>
    </View>

export default TestScreen2;
