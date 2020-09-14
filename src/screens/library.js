import React, { Component, useState } from 'react';
import {View, Text, ScrollView} from 'react-native';

//This is how you import the style sheet
import { styles, buttons } from '../styles/styles.js';
import {TouchableOpacity,TouchableHighlight, Image}  from "react-native";



class Library extends Component {
    render() {

        return (
            <View style={{
                backgroundColor: "gold",
                flex: 1
                }}>
                <View style={{
                    backgroundColor: "#f8ebc4",
                    flex: 0.6,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={styles.storyTitleText}>Library</Text>
                </View>
                <View style={{
                    backgroundColor: "white",
                    flex: 7
                }}>
                    <View style={{
                        flex: 0.1,
                    }}>
                        {/*This is where the drop down menus are going*/}

                    </View>
                    <ScrollView style={{
                        backgroundColor: "white",
                        flex: 10
                    }}>
                        {/*This is for the list of books in the library */}

                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default Library;
