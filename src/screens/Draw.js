import React, { Component } from 'react';
import {View, Alert, Button} from 'react-native';

import {buttons, styles} from '../styles/styles'

const Draw = () => {
    return (
        <View style={styles.container}>
            <Button
                title="Press me"
                onPress={() => Alert.alert("Simple button pressed")}
            />
        </View>

    );
}

export default Draw;