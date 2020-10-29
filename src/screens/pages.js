import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';
import {styles, buttons} from '../styles/styles.js';
import Draw from '../components/draw.js'
import ShowBooks from '../components/showBook.js'
import { returnBuzz64String } from "../assets/buzz64";
import Sound from 'react-native-sound';
import {canvas} from "../styles/styles";

/***
 * A screen to display either the Canvas or the created image of the book
 * @param book - A book object from the JSON wiki
 * @returns {JSX.Element}
 * @constructor
 */
const Pages = (book) => {
    const bookId = book.route.params.bookId;
    const [pageNumber, setPageNumber] = useState(-1);
    const [pages, setPages] = useState(book.route.params.pages);
    const [page, setPage] = useState(pages[0])
    const [storyTitle, setStoryTitle] = useState(book.route.params.bookTitle);
    const [key, setKey] = useState(1000);
    const [imageString, setImageString] = useState("");
    const [pageTheme, setPageTheme] = useState(page.theme);
    const [roleImage, setRoleImage] = useState((require("../assets/images/tick.png")));

    /* Check to see if creator has finished their contribution for that page */
    function checkCreatorFinal(num) {
        setImageString("")
        // console.log(pages[num])
        pages[num].creators.map((item) => {
            if (item.studentId == global.id) {
                if (!(item.canvas === "")) {
                    setImageString(item.canvas)
                }
            }
        })
    }

    /* Sets the imageString to the correct base 64 image string or to a default string
      if image string is non existent
     */
    function setFinalImageString(num) {
        // console.log("page active = " + pages[num].active)
        if (!(pages[num].active)) {
            if (pages[num].finalImage === "") {
                setImageString(returnBuzz64String())
            } else {
                setImageString(pages[num].finalImage)
            }
        }
    }

    function getCreatorIcon(num) {
        let userRole = ""
        pages[num].creators.map((item) => {
            if (item.studentId == global.id) {
                userRole = item.role
            }
        })
        if (userRole === "background") {
            setRoleImage(require("../assets/images/roles_background.png"));
        } else if (userRole === "illustrator") {
            setRoleImage(require("../assets/images/roles_illustrator.png"));
        } else if (userRole === "writer") {
            setRoleImage(require("../assets/images/roles_writer.png"));
        } else {
            setRoleImage(require("../assets/images/tick.png"));
        }
    }

    function changePageTheme(num) {
        setPageTheme(pages[num].theme)
    }

    /*
     * Function to increment the values used for a page
     */
    function increment() {
        setPage(pages[pageNumber + 1])
        setPageNumber((prevState) => prevState + 1)
        setKey((prevState) => prevState + 1)
    }

    /*
     * Function to decrement the values used for a page
     */
    function decrement() {
        setPage(pages[pageNumber - 1])
        setPageNumber((prevState) => prevState - 1)
        setKey((prevState) => prevState + 1)
    }

    /**
     * This will change the page and update pageNumber
     * @params value: 'increment' or 'decrement'
     */
     function changePage(value) {
        if (value === 'increment' && pageNumber < pages.length - 1) {
            increment()
            checkCreatorFinal(pageNumber + 1)
            setFinalImageString(pageNumber + 1)
            changePageTheme(pageNumber + 1)
            getCreatorIcon(pageNumber + 1)
        }
        else if (value === 'decrement' && pageNumber > 0) {
            decrement()
            checkCreatorFinal(pageNumber - 1)
            setFinalImageString(pageNumber - 1)
            changePageTheme(pageNumber - 1)
            getCreatorIcon(pageNumber - 1)
        }
    }

    function isUserACreator() {
        let creators = page.creators;
        // console.log("checking if " + global.id + " is a creator");
        for (let cr = 0; cr < creators.length; cr++) {
            if (global.id === creators[cr].studentId) {
                // console.log("true");
                return true;
            }
        }
        // console.log("false");
        return false;
    }

    return (
        <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
            {/* Page Title */}
            <View style={{width:'100%', flex: 1}}>
                {(pageNumber < 0)
                    ? <Text style={styles.title}>{storyTitle}</Text>
                    :
                    <View style={{width: '100%', flex: 1}}>
                            <Text style={styles.titleBig}>{storyTitle}</Text>
                        <View style={{backgroundColor: '#f8ebc4', paddingBottom: 5, flexDirection: "row",
                            justifyContent: "space-between"}}>
                            <View style={{alignItems: "center", flex: 1, marginLeft: 10}}>
                                <Text style={styles.titleSmall}>{pageTheme}</Text>
                            </View>
                            <View style={{alignItems: "center", marginRight: 10}}>
                                <Image source={roleImage} resizeMode={"contain"} style={canvas.role}/>
                            </View>
                        </View>
                    </View>
                }
            </View>
            {/* Canvas Layout */}
            {(pageNumber < 0)
                ? <View style={canvas.layout}>
                    <Image
                        resizeMode={'contain'}
                        style={{
                            width: '100%',
                            height: '100%',
                            }}
                        source={require('../assets/images/cover.png')}
                  />
                </View>
                :
                <View style={canvas.layout}>
                    {(imageString === "" && isUserACreator())
                        ?
                        <Draw
                            bookId={bookId}
                            pageId={pageNumber}
                            page={page}
                            key={key}
                            save={() => saveImage()}
                        />
                        : <ShowBooks
                            pageNum={pageNumber}
                            imageString={imageString}
                            key={key}/>
                    }
                </View>
            }
            {/* Page Navigation */}
            <View style={canvas.pageNav}>

                <TouchableOpacity style={buttons.buttonPages}
                                  onPress={() => changePage('decrement')}
                                  title={"Back"}
                >
                    <Text style={buttons.buttonTextWhite}>back page</Text>
                </TouchableOpacity>

                <View style={{backgroundColor: "#fdda64", justifyContent: "center"}}>
                    {(pageNumber < 0)
                        ? <Text style={styles.storyTitleText}>Title Screen</Text>
                        : <Text style={styles.storyTitleText}>page {pageNumber + 1} of {pages.length}</Text>}
                </View>

                <TouchableOpacity style={buttons.buttonPages}
                                  onPress={() => changePage('increment')}
                                  title={"Next Page"}
                >
                    <Text style={buttons.buttonTextWhite}>next page</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}

export default Pages;
