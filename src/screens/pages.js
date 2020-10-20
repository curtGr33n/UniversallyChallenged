import React, {Component, useState} from 'react';
import {View, Text } from 'react-native';

import {styles, buttons, page} from '../styles/styles.js';
import {TouchableOpacity,TouchableHighlight, Image, Button}  from "react-native";
import Draw from '../components/draw.js'

const Pages = (book) => {
    const bookId = book.route.params.bookId;
    console.log("BookId: " + bookId);
    // const [pageNumber, setPageNumber] = useState(book.route.params.pages.pagenum);
    //console.log("This is the pagenum")

    const [pageNumber, setPageNumber] = useState(0);
    const [pages, setPages] = useState(book.route.params.pages);
    //console.log(pages)
    const [page, setPage] = useState(pages[pageNumber])
    //console.log(page)
    const [storyTitle, setStoryTitle] = useState(book.route.params.bookTitle);

    function changePage(value) {
        if (value === 'increment' && pageNumber < pages.length - 1) {
            //console.log('increment pressed')
            //console.log("Current pageNum")
            //console.log(pageNumber)
            setPage(pages[pageNumber + 1])
            setPageNumber((prevState) => prevState + 1)
            //console.log("Current page")
            //console.log(page)
        }
        else if (value === 'increment' && pageNumber == pages.length - 1) {
            setPage(pages[pages.length - 1])
        }
        else if (value === 'decrement' && pageNumber > 0) {
            //console.log('decrement pressed')
            //console.log("Current pageNum")
            //console.log(pageNumber)
            setPage(pages[pageNumber - 1])
            setPageNumber((prevState) => prevState - 1)
            //console.log("Current page")
            //console.log(page)
        }
        else if (value === 'decrement' && pageNumber == 0) {
            setPage(pages[0])
        }
        //console.log("Current pageNum after setPageNumber")
        //console.log(pageNumber)
    }

    return (
        <View
        style={{
            backgroundColor: "gold",
            flex: 1
        }}>
            <Text style={page.title}>{storyTitle}</Text>
            <View style={{
                backgroundColor: "white",
                flex: 7,
                justifyContent:'center',
                alignItems: 'center'
            }}>
                <Draw
                    bookId={bookId}
                    pageId={pageNumber}
                />
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
                    padding: 15
            }}>
                <TouchableOpacity style={buttons.buttonPages}
                      onPress={() => changePage('decrement')}
                        title={"Back"}
                                  >
                    <Text style={buttons.buttonTextWhite}>back page</Text>
                </TouchableOpacity>
                <View
                    style={{
                        backgroundColor: "#fdda64",
                        justifyContent: "center",
                    }}>
                    <Text style={styles.storyTitleText}>page {pageNumber + 1} of {pages.length}</Text>
                </View>
                <TouchableOpacity style={buttons.buttonPages}
                                  onPress={() => changePage('increment')}
                        title={"Next Page"}
                >
                    <Text style={buttons.buttonTextWhite}>next page</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default Pages;
