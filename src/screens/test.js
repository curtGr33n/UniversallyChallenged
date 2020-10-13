import React, {Component, useState} from "react";
import { Animated, Easing, StyleSheet, TouchableOpacity, View, AppRegistry} from "react-native";

import {canvas, buttons} from '../styles/styles';
import Slider from "@react-native-community/slider";

function Test () {
    const [value, setValue] = useState(0);
    const maxVal = 500

    return (
        <View style={{flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
            <View style={{
                borderRadius: maxVal/2,
                width: maxVal,
                height: maxVal,
                backgroundColor: "white",
                position: "absolute",
                right: 450,
                top: 100,
                marginHorizontal: 2.5,

            }}>
                <View style={{
                    borderRadius: value/2,
                    width: value,
                    height: value,
                    backgroundColor: "black",
                    position: "absolute",
                    top: (maxVal - value) / 2,
                    right: (maxVal - value) / 2
                }}/>
            </View>
            <Slider
                style={{width: 200, height: 40, position: "absolute",  right: 20,
                        transform: [{rotate: "-90deg"}] }}
                minimumValue={0}
                maximumValue={maxVal}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={value}
                onValueChange={(newSize) => setValue(newSize) }
            />
        </View>
    );
}

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

const a = () => {
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

export default Test
