import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {styles, buttons, page, forms} from '../styles/styles.js';
import {FlatGrid} from "react-native-super-grid";
import Pages from "./pages";

const Library = (props) => {
    const [books, setBooks] = useState([])
    const [classId, setClassId] = useState(0)
    const [userClasses, setUserClasses] = useState(global.classid)
    const [schoolId, getSchoolId] = useState(global.school)

    /**
     * Gets the list of books based on the classId and schoolId of the current logged in user
     * sets books to this list
     * @returns {Promise<void>}
     */
    const getData = async () => {
        try {
            console.log(classId);
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/getClassBooks?classId=' + classId + '&school=' + schoolId);
            if (response.ok) {
                let juice = await response.text();
                let data = JSON.parse(juice)
                console.log(data)
                setBooks(data)
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Gets the list of books based on userId
     * Sets books to this list
     * @returns {Promise<void>}
     */
    const getMyBooks = async () => {
        try {
            console.log(global.id)
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/getMyBooks?studentId=' + global.id);
            if (response.ok) {
                let juice = await response.text();
                let data = JSON.parse(juice);
                console.log(data)
                setBooks(data)
            } else {
                alert("HTTP-Error: " + response.status);
            }
        }  catch (error) {
            console.error(error);
        }
    }

    /*
     * Helper function to create a list of <Picker> objects to display in
     * picker list
     * @returns {*}
     */
    function getPickerItems() {
        return userClasses.map((user, index) => (
            <Picker.Item label={user.toString()} value={user} key={index}/>
        ))
    }

    function getRandomBookCover() {
        let bookCovers =[require('../assets/current-book-covers/books-1.png'),
            require('../assets/current-book-covers/books-2.png'),
            require('../assets/current-book-covers/books-3.png'),
            require('../assets/current-book-covers/books-4.png'),
            require('../assets/current-book-covers/books-5.png'),
            require('../assets/current-book-covers/books-6.png')]
        let random = Math.floor(Math.random() * 6)
        return bookCovers[random]
    }

    return (
        <View style={{flex: 1}}>

            {/* Page Title */}
            <View style={{width:'100%'}}>
                <Text style={page.title}>Library</Text>
            </View>

            <View style={{ backgroundColor: "white", flex: 7}}>
                <View style={page.libraryLayout}>

                    {/* DropDown Selection */}
                    <View style={page.dropDown}>
                        <Picker
                            selectedValue={classId}
                            prompt={"Choose class books list"}
                            onValueChange={((itemValue, itemIndex) => setClassId(itemValue))}>
                            <Picker.Item label={"Select a class library..."} value={''}/>
                            {getPickerItems()}
                        </Picker>
                    </View>

                    {/* Submit/Load Button */}
                    <TouchableOpacity onPress={() => getData()}
                                      style={buttons.buttonPages}
                                      title={"Load Books"}>
                        <Text style={buttons.textWhite}>Load Class Books</Text>
                    </TouchableOpacity>

                    {/* Get my books button */}
                    <TouchableOpacity onPress={() => getMyBooks()}
                                      style={buttons.buttonPages}
                                      title={"Get My Books"}>
                        <Text style={buttons.textWhite}>My Books</Text>
                    </TouchableOpacity>
                </View>

                {/* Library Layout */}
                <FlatGrid
                    itemDimension={300}
                    data={books}
                    style={styles.gridView}
                    spacing={20}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                                <TouchableOpacity style={styles.bookText}
                                      onPress={() => props.navigation.navigate('Pages', item)}>
                                    <ImageBackground source={getRandomBookCover()}
                                                     style={page.bookImage}
                                                     resizeMode={'contain'}
                                    >
                                    </ImageBackground>
                                    <Text style={page.bookText}>{item.bookTitle}</Text>
                                </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

export default Library;
