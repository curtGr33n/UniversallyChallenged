import React, {Component, useState} from 'react';
import {View, Text } from 'react-native';

import { styles, buttons } from '../styles/styles.js';
import {TouchableOpacity,TouchableHighlight, Image, Button}  from "react-native";
import Draw from '../components/draw.js'

const Pages = (book) => {
    //console.log("Hopefully the book passed into props")
    //console.log(book.route.params.bookTitle)
    const [pageNumber, setPageNumber] = useState(book.route.params.pages.pagenum);
    const [pages, setPages] = useState(1);
    const [storyTitle, setStoryTitle] = useState(book.route.params.bookTitle);
    const [authors, setAuthors] = useState(book.route.params.pages.creators);

    /*function displayAuthors() {
        let auths = "";
        authors.map(auth => auths + auth);
        return auths;
    }*/
    //console.log(authors)

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
                <Text style={styles.storyTitleText}>{storyTitle}</Text>
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
