import React, { Component, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import AddCreatorForm from "../components/AddCreatorForm";
import CreateBookForm from "../components/CreateBookForm";
//This is how you import the style sheet
import {styles, buttons, page} from '../styles/styles.js';
import {TouchableOpacity,TouchableHighlight, Image}  from "react-native";



class Teacher extends Component {
    test(){
        return(
                <AddCreatorForm bookId='1'/>
        )
    }
    render() {

        return (
            <View style={styles.container}>
                <Text style={page.title}>Teacher Controls</Text>

                <View style={page.homeButtons}>
                    {this.test()}
                </View>

            </View>
        )
    }
}

export default Teacher;
