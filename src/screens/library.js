import React, { Component} from 'react';
import { View, Text, TouchableOpacity, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
//import BooksList from '../components/booksListDeprecated.js'

//This is how you import the style sheet
import {styles, buttons, page} from '../styles/styles.js';
import {useNavigation} from "@react-navigation/core";
import {FlatGrid} from "react-native-super-grid";
import {Tile} from "react-native-elements";

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
                this.setState({books:data
                })
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    getLibraryBooks = () => {
        /* this function needs to be ale to call all the books from
        the server for the school, class, student and set books to the array
        of objects*/
        let booksList =  this.getData()

        /* For future reference to add to a state list use this
        this.setState(prevState => ({ books: [...prevState.books, 'Test']
        }))
        */
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
                        spacing={10}
                        renderItem={({item}) => (
                            <View style={styles.itemContainer}>
                                <Tile imageSrc={require('../assets/place-holder-open-book.png')}
                                      containerStyle={styles.image}
                                      title={item.bookTitle}
                                      titleStyle={styles.bookText}
                                      style={styles.bookText}
                                      onPress={page}
                                />
                            </View>
                        )}
                    />
                </View>
                <this.MyReactNativeForm />
            </View>
        )
    }
    /* Returns the list of book objects to be displayed in the library */
}

export default Library;
