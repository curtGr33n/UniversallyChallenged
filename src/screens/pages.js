import React, {useState} from 'react';
import {View, Text, Modal} from 'react-native';
import {styles, buttons} from '../styles/styles.js';
import {TouchableOpacity}  from "react-native";
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
    global.id = 4;
    const bookId = book.route.params.bookId;
    //console.log("BookId: " + bookId);
    const [pageNumber, setPageNumber] = useState(0);
    const [pages, setPages] = useState(book.route.params.pages);
    const [page, setPage] = useState(pages[pageNumber])
    const [storyTitle, setStoryTitle] = useState(book.route.params.bookTitle);
    const [key, setKey] = useState(1000);
    const [creatorFinal, setCreatorFinal] = useState(false);
    const [imageString, setImageString] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);

    /* Create sound effect to be played on page increment/decrement */
    const sound = new Sound('page_turn.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }

        // Play the sound with an onEnd callback
        sound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    });

    /* Check to see if creator has finished their contribution for that page */
    function checkCreatorFinal() {
        page.creators.map((item) => {
            if (item.studentId == global.id) {
                if (!(item.canvas === "")) {
                    setCreatorFinal(true)
                    setImageString(item.canvas)
                }
            }
        })
    }

    /* Sets the imageString to the correct base 64 image string or to a default string
      if image string is non existent
     */
    function setFinalImageString() {
        if (creatorFinal) {
            if (!(page.active)) {
                setImageString(page.finalImage)
            } else if (imageString === "") {
                page.creators.map((item) => {
                    if (item.studentId == global.id) {
                        if (!(item.canvas === "")) {
                            setImageString(item.canvas)
                        } else {
                            /*Set default base64 image string because something went
                              wrong above
                             */
                            setImageString(returnBuzz64String())
                        }
                    }
                })
            } else {
                /*Set default base64 image string because something went
                  wrong above
                 */
                setImageString(returnBuzz64String())
            }
        }
    }

    /*This will change the page and update pageNumber */
    function changePage(value) {
        if (value === 'increment' && pageNumber < pages.length - 1) {
            setPage(pages[pageNumber + 1])
            setPageNumber((prevState) => prevState + 1)
            setKey((prevState) => prevState + 1)
            checkCreatorFinal()
            setFinalImageString()
            getRole();
        }
        else if (value === 'increment' && pageNumber == pages.length - 1) {
            setPage(pages[pages.length - 1])
        }
        else if (value === 'decrement' && pageNumber > 0) {
            setPage(pages[pageNumber - 1])
            setPageNumber((prevState) => prevState - 1)
            setKey((prevState) => prevState - 1)
            checkCreatorFinal()
            setFinalImageString()
            getRole()
        }
        else if (value === 'decrement' && pageNumber == 0) {
            setPage(pages[0])
        }
        // Play sound effect
        sound.play();
    }

    return (
        <View style={{flex: 1}}>

            {/* Page title */}
            <Text style={styles.title}>{storyTitle}</Text>

            {/* Canvas Layout */}
            <View style={canvas.layout}>
                { !creatorFinal && page.active
                    ? <Draw
                        bookId={bookId}
                        pageId={pageNumber}
                        page={page}
                        key={key}
                        role={role}
                    />
                    : <ShowBooks
                        pageNum={pageNumber}
                        imageString={imageString}
                        key={key}/>
                }
            </View>

            {/* Page Navigation */}
            <View style={canvas.pageNav}>

                <TouchableOpacity style={buttons.buttonPages}
                                  onPress={() => changePage('decrement')}
                                  title={"Back"}
                >
                    <Text style={buttons.buttonTextWhite}>back page</Text>
                </TouchableOpacity>

                <View style={{backgroundColor: "#fdda64", justifyContent: "center"}}>
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
    )
}

export default Pages;
