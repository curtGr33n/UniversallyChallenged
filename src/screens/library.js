import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {styles, buttons, page} from '../styles/styles.js';
import {FlatGrid} from "react-native-super-grid";
import Pages from "./pages";

const background = {uri: '../assets/place-holder-open-book.png'};

const Library = (props) => {
    const [books, setBooks] = useState([])
    const [schoolId, setSchoolId] = useState(0)
    const [classId, setClassId] = useState(0)
    const [studentId, setStudentId] = useState(0)
    const [userClasses, setUserClasses] = useState(global.classid)

    /** Gets the list of books based on the classId chosen
     *  sets books to this list
     *  return: null
     */
    const getData = async () => {
        try {
            console.log(classId);
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/getClassBooks?classId=' + classId);
            if (response.ok) {
                let juice = await response.text();
                let data = JSON.parse(juice)
                console.log(data)
                setBooks(data
                )
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    /* Helper function to create a list of <Picker> objects to display in
     * picker list
    */
    function getPickerItems()
    {
        return userClasses.map((user, index) => (
            <Picker.Item label={user.toString()} value={user} key={index}/>
        ))
    }

    /** Returns the path to the image file of a bookCover or the path of the
     * generic bookCover image if bookCoverLink = null
     * Returns: image path
    */
    const getImage = (bookCoverLink) => {
        if (bookCoverLink == null || bookCoverLink == "none") {
            return (background);
        } else {
            let path = bookCoverLink;
            return path;
        }
    }

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
                <Text style={page.title}>Library</Text>
            </View>
            <View style={{
                backgroundColor: "white",
                flex: 7
            }}>
                <View style={{
                    flex: 0.1,
                    flexDirection: 'row',
                    justifyContent: "space-around",
                    backgroundColor: '#fdda64'
                }}>
                    {/*This is where the drop down menus are going*/}
                    <View>
                        <Picker
                            selectedValue={classId}
                            style={{Height: 50, width: 300}}
                            prompt={"Choose class books list"}
                            onValueChange={((itemValue, itemIndex) => setClassId(itemValue))}>
                            <Picker.Item label={"Select a class library"} value={''}/>
                            {getPickerItems()}
                        </Picker>

                    </View>
                    <TouchableOpacity onPress={() => getData()}
                                      style={buttons.buttonPages}
                                      title={"Load Books"}>
                        <Text>Load Books</Text>
                    </TouchableOpacity>
                </View>

                <FlatGrid
                    itemDimension={300}
                    data={books}
                    style={styles.gridView}
                    spacing={20}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <ImageBackground source={getImage(item.bookCoverLink)}
                                   style={{width: '100%', height: '100%', alignItems:"center", justifyContent:"center"}}
                                   >
                                <TouchableOpacity style={styles.bookText}
                                      onPress={() => props.navigation.navigate('Pages', item)}>
                                    <Text>{item.bookTitle}</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

export default Library;
