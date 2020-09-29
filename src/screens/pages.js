import React, {Component, useState} from 'react';
import {View, Text } from 'react-native';

//This is how you import the style sheet
import { styles, buttons } from '../styles/styles.js';
import {TouchableOpacity,TouchableHighlight, Image, Button}  from "react-native";
import Draw from '../components/draw.js'

function Pages () {
    //These might not be needed
    const [pageNumber, setPageNumber] = useState(1);
    const [pages, setPages] = useState(1);
    const [storyTitle, setStoryTitle] = useState('Title');
    const [authors, setAuthors] = useState('Peeps')

    return (
        <View
        style={{
            backgroundColor: "gold",
            flex: 1
        }}>
            <View style={{
                backgroundColor: "#f8ebc4",
                flex: 0.8
            }}>
                <Text style={styles.storyTitleText}>{storyTitle} by {authors}</Text>
            </View>
            <View style={{
                backgroundColor: "white",
                flex: 7,
                justifyContent:'center',
                alignItems: 'center'
            }}>
                <Draw/>

            </View>
            <View style={{
                backgroundColor: "#f8ebc4",
                flex: 1
            }}/>
            <View
                style={{
                    backgroundColor:"#fdda64",
                    flex: 0.8,
                    flexDirection: 'row',
                    justifyContent: "space-around",
            }}>
                <TouchableOpacity style={buttons.buttonPages}
                      onPress={() => console.log("Back Pressed")}
                        title={"Back"}
                                  >
                    <Text>Back</Text>
                </TouchableOpacity>
                <View
                    style={{
                        backgroundColor: "#fdda64",
                        justifyContent: "center",
                    }}>
                    <Text style={styles.storyTitleText}>page {pageNumber} of {pages}</Text>
                </View>
                <TouchableOpacity style={buttons.buttonPages}
                                  onPress={() => console.log("Next Pressed")}
                        title={"Next Page"}
                >
                    <Text>Next Page</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default Pages;
