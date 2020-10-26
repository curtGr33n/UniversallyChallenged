import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {styles, buttons, page} from '../styles/styles.js';
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
    global.id = 200;
    const bookId = book.route.params.bookId;
    console.log("bookId = " + bookId);
    //console.log("BookId: " + bookId);
    const [pageNumber, setPageNumber] = useState(-1);
    console.log("Page number (hook) = " + pageNumber);
    const [pages, setPages] = useState(book.route.params.pages);
    //console.log("Pages = " + JSON.stringify(pages));
    const [page, setPage] = useState(pages[0])
    console.log("Page = " + JSON.stringify(page));
    const [storyTitle, setStoryTitle] = useState(book.route.params.bookTitle);
    const [key, setKey] = useState(1000);
    const [creatorFinal, setCreatorFinal] = useState(false);
    const [imageString, setImageString] = useState("");

    /* Create sound effect to be played on page increment/decrement */
    const sound = new Sound('page_turn.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
    });

    function playSound() {
        // Play the sound with an onEnd callback
        sound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    }

    /* Check to see if creator has finished their contribution for that page */
    function checkCreatorFinal(num) {
        setImageString("")
        console.log("Checking current Creator canvas " + pages[num].pagenum)
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
        console.log("Set Final image string for page number " + pages[num].pagenum)
        //console.log("Pages variables = " + pages[num])
        console.log("Pages final image string = " + pages[num].finalImage)
        if (!(pages[num].active)) {
            console.log("pages final image string = " + pages[num].finalImage)
            if (pages[num].finalImage === "") {
                setImageString(returnBuzz64String())
            } else {
                console.log("Page active = false")
                setImageString(pages[num].finalImage)
                console.log(pages[num].finalImage)
            }
        }
    }

    /*
     * Function to increment the values used for a page
     */
    function increment() {
        setPage(pages[pageNumber + 1])
        setPageNumber((prevState) => prevState + 1)
        setKey((prevState) => prevState + 1)
        console.log("Finished await Increment")
    }

    /*
     * Function to decrement the values used for a page
     */
    function decrement() {
        setPage(pages[pageNumber - 1])
        setPageNumber((prevState) => prevState - 1)
        setKey((prevState) => prevState + 1)
        console.log("Finished await Decrement")
    }

    /*console.log("Set Final image string for page number " + page.pagenum)
    /*
     * This will change the page and update pageNumber
     */
    async function changePage(value) {
        if (value === 'increment' && pageNumber < pages.length - 1) {
            console.log("INCREMENTING")
            let oldString = imageString
            console.log("Current page number we think it is = " + pageNumber)
            await increment()
            await checkCreatorFinal(pageNumber + 1)
            await setFinalImageString(pageNumber + 1)
            console.log("New page number we think it is = " + pageNumber)
            console.log("End of INCREMENT")
            //console.log("Strings same = " + checkStringSame(oldString, imageString))
        }
        else if (value === 'decrement' && pageNumber > 0) {
            console.log("DECREMENTING")
            //let oldString = imageString
            console.log("Current page number we think it is = " + pageNumber)
            await decrement()
            await checkCreatorFinal(pageNumber - 1)
            await setFinalImageString(pageNumber - 1)
            console.log("New page number we think it is = " + pageNumber)
            console.log("End of DECREMENT")
            //console.log("Strings same = " + checkStringSame(oldString, imageString))
        }
    }

    function isUserACreator() {
        let creators = page.creators;
        for (let cr = 0; cr < creators.length; cr++) {
            if (global.id === creators[cr].studentId) {
                return true;
            }
        }
        return false;
    }

    function checkStringSame(firstString, secondString) {
        if (firstString === secondString) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
            {/* Page Title */}
            <View style={{width:'100%'}}>
                {(pageNumber < 0)
                    ? <Text style={styles.title}></Text>
                    :
                    <Text style={styles.title}>{storyTitle}</Text>
                }
            </View>
            {/* Canvas Layout */}
            {(pageNumber < 0)
                ? <Text style={styles.titleBig}>{storyTitle}</Text>
                :
                <View style={canvas.layout}>
                    {(imageString === "" && isUserACreator())
                        ? <Draw
                            bookId={bookId}
                            pageId={pageNumber}
                            page={page}
                            key={key}
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
