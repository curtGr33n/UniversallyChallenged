import React, { Component} from 'react';
import {View, Text, ScrollView, Picker} from 'react-native';
import { Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import {styles, buttons, page} from '../styles/styles.js';

const getData = async (values) => {
    try {
        let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/Books?bookTitle=' + values.bookTitle + '&bookCoverLink=none&school='+ 'sessionVariable' + '&classID=' + values.classId);
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

const AddCreatorForm = (props) => {
    alert(props.bookId);
    return (
        <Formik
            initialValues={{ bookId : -1, pageId: -1, sID: -1, role: ''}} //put class session variable here
            onSubmit={(values) => {
                console.log(values);
                //this.props.navigation.navigate('addCreatorForm');
            }}
        >
            {(props) => (
                <View>
                    <TextInput
                        style={{ borderColor: 'black', borderWidth: 2 }}
                        placeholder= 'bookTitle'
                        onChangeText={props.handleChange('bookTitle')}
                        value={props.values.bookTitle}
                    />

                    <Picker
                        selectedValue={props.values.classId}
                        onValueChange={props.handleChange('classId')}>
                        <Picker.Item label="This will have classes when Johann fix it" value="0" />
                        <Picker.Item label="Requested" value="1" />
                        <Picker.Item label="Responded" value="2" />
                        <Picker.Item label="Closed" value="3" />
                    </Picker>
                    <Button title='submit' color='red' onPress={props.handleSubmit} />
                </View>
            )}
        </Formik>
    );
}

export default AddCreatorForm;
