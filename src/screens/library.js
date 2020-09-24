import React, { Component, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native';
import { Formik } from 'formik';

//This is how you import the style sheet
import {styles, buttons, page} from '../styles/styles.js';
import {TouchableOpacity,TouchableHighlight, Image}  from "react-native";



class Library extends Component {

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
                        {/*This is for the list of books in the library */}

                    </ScrollView>
                </View>
                <this.MyReactNativeForm />
            </View>
        )
    }
}

export default Library;
