import React from "react";
import { Animated, Easing, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {canvas, buttons} from '../styles/styles';

function Test2 () {
    const opacity = new Animated.Value(0);

    const animate = () => {
        opacity.setValue(0);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 10000,
            easing: Easing.elastic(1)
            // useNativeDriver: true
        }).start();
    };

    const h = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [600, 0]
    });

    const w = opacity.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: [0, 600, 601, 601]
    })

    const animatedStyle = [
        buttons.largeButton,
        {
            opacity,
            width: w,
            height: h
        }
    ];

    return (
        <View style={canvas.container}>
            <TouchableOpacity
                style={buttons.largeButton}
                onPress={() => animate()}
            />
            {/*<TouchableOpacity*/}
            {/*    style={buttons.largeButton}*/}
            {/*    onPress={() => animate()}*/}
            {/*/>*/}
            <Animated.View style={animatedStyle}/>
        </View>
    );
}

const Test = () => {
    const opacity = new Animated.Value(0);

    const animate = () => {
        opacity.setValue(0);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            easing: Easing.elastic(1)
        }).start();
    };

    const size = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [600, 0]
    });

    const animatedStyle = [
        styles.bar,
        {
            opacity,
            width: size,
            height: 80
        }
    ];

    // return (
    //     <View style={canvas.container}>
    //         <TouchableOpacity
    //             style={buttons.smallButton}
    //             onPress={() => animate()}
    //         />
    //         <Animated.View style={animatedStyle}/>
    //     </View>
    // );
    return (
        <Test2/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#20232a"
    },
    title: {
        marginTop: 10,
        textAlign: "center",
        color: "#61dafb"
    },
    boxContainer: {
        height: 160,
        alignItems: "center"
    },
    box: {
        marginTop: 32,
        borderRadius: 4,
        backgroundColor: "#61dafb"
    },
    list: {
        backgroundColor: "#fff"
    },
    listHeader: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: "#f4f4f4",
        color: "#999",
        fontSize: 12,
        textTransform: "uppercase"
    },
    listRow: {
        padding: 8
    }
});

export default Test;
