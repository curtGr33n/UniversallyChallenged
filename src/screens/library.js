import React, { Component} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Button, TextInput } from 'react-native';
import { Formik } from 'formik';


import {styles, buttons, page} from '../styles/styles.js';
import {FlatGrid} from "react-native-super-grid";
import {Tile} from "react-native-elements";
import Pages from "./pages";

const background = {uri: '../assets/place-holder-open-book.png'};

class Library extends Component {

    state = {
        schoolId: 0,
        classId: 1,
        studentId: 0,
        books: []
    };

    setStudentId = (id) => {
        this.setState({studentId: id})
    };

    setClassroomId = (id) => {
        this.setState({classId: id})
    };

    setSchoolId = (id) => {
        this.setState({schoolId: id})
    };

    getData = async () => {
        try {
            console.log(this.state.classId);
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/getClassBooks?classId=' + this.state.classId);
            if (response.ok) {
                let juice = await response.text();
                let data = JSON.parse(juice)
                console.log(data)
                this.setState({books:data
                })
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    getImage = (bookCoverLink) => {
        if (bookCoverLink == null || bookCoverLink == 'none') {
            return ('../assets/place-holder-open-book.png');
        } else {
            let path = bookCoverLink;
            return path;
        }
    }

    render() {
        return (
                <View style={styles.container}>
                    <Text style={page.title}>Library</Text>
                    <View style={{
                        flex: 0.1,
                        flexDirection: 'row',
                        justifyContent: "space-around",
                    }}>
                        {/*This is where the drop down menus are going*/}
                        <View>

                        </View>
                        <View>

                        </View>
                        <TouchableOpacity onPress={() => this.getData()}
                                          style={styles.bookText}>
                            <Text>Touch me baby, please</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatGrid
                        itemDimension={300}
                        data={this.state.books}
                        style={styles.gridView}
                        spacing={20}
                        renderItem={({item}) => (
                            <View style={styles.itemContainer}>
                                <ImageBackground source={background}
                                       style={{width: '100%', height: '100%', alignItems:"center", justifyContent:"center"}}
                                       >
                                    <TouchableOpacity style={styles.bookText}
                                          onPress={() => this.props.navigation.navigate('Pages', item)}>
                                        <Text>{item.bookTitle}</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        )}
                    />
                </View>
        )
    }
}

export default Library;
