import React, { Component, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import { Tile } from 'react-native-elements';

//This is how you import the style sheet
import {styles, buttons, page} from '../styles/styles.js';
import {TouchableOpacity,TouchableHighlight, Image}  from "react-native";

const { width } = Dimensions.get("window");

// tpr = tiles per row
const calcTileDimensions = (deviceWidth, tpr) => {
    const margin = deviceWidth / (tpr * 10);
    const size = (deviceWidth - margin * (tpr * 2)) / tpr;
    return { size, margin };
};

const Book = ({size, margin, text}) => (
    <View style={[styles.bookTest, {width: size, height: size, marginHorizontal: margin}]}>
        <Text style={styles.logoText}>{text}</Text>
    </View>
)

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books:[ {id: 1, book: <Tile imageSrc={require('../assets/place-holder-open-book.png')}
                                        title={'Test_1'}
                                        titleStyle={styles.bookText}
                                        style={styles.bookText}
                                        featured
                    />},
                {id: 2, book: <Tile imageSrc={require('../assets/place-holder-open-book.png')}
                                    title={'Test_2'}
                                    titleStyle={styles.bookText}
                                    style={styles.bookText}
                                    featured
                    />},
                {id: 3, book: <Tile imageSrc={require('../assets/place-holder-open-book.png')}
                                    title={'Test_3'}
                                    titleStyle={styles.bookText}
                                    style={styles.bookText}
                                    featured
                    />},
                {id: 4, book: <Tile imageSrc={require('../assets/place-holder-open-book.png')}
                                    title={'Test_4'}
                                    titleStyle={styles.bookText}
                                    style={styles.bookText}
                                    featured
                    />},
                {id: 5, book: <Tile imageSrc={require('../assets/place-holder-open-book.png')}
                                    title={'Test_5'}
                                    titleStyle={styles.bookText}
                                    style={styles.bookText}
                                    featured
                    />},
                {id: 6, book: <Tile imageSrc={require('../assets/place-holder-open-book.png')}
                                    title={'Test_6'}
                                    titleStyle={styles.bookText}
                                    style={styles.bookText}
                                    featured
                    />},
                {id: 7, book: <Tile imageSrc={require('../assets/place-holder-open-book.png')}
                                    title={'Test_7'}
                                    titleStyle={styles.bookText}
                                    style={styles.bookText}
                                    featured
                    />}
            ]
        };
    }

    getData = async (values) => {
        try {
            console.log(values.classId);
            //console.log('deco3801-universally-challenged.uqcloud.net/getClassBooks?classId=' + values.classId);
            //let response = await fetch('deco3801-universally-challenged.uqcloud.net/getClassBooks?classId=' + values.classId);
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/getClassBooks?classId=' + values.classId);
            if (response.ok) {
                console.log(response);
                let juice = await response.text();
                console.log(juice);
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    MyReactNativeForm = props => (
        <Formik
            initialValues={{ classId : -1 }}
            onSubmit={
                values => this.getData(values)
                //values => console.log(values)
                //this.getData(values);
            }
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <TextInput
                        style={{ borderColor: 'black', borderWidth: 2 }}
                        onChangeText={handleChange('classId')}
                        onBlur={handleBlur('classId')}
                        value={values.email}
                    />
                    <Button onPress={handleSubmit} title="Submit" />
                </View>
            )}
        </Formik>
    );

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
                    <Text style={page.title}>Library</Text>
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
                        {this.booksList()}
                    </ScrollView>
                </View>
                <this.MyReactNativeForm />
            </View>
        )
    }
    booksList() {
        return this.state.books.map((book) => {
            return (
                <View>
                    {book.book}
                </View>
            )
        })
    }
}

export default Library;
