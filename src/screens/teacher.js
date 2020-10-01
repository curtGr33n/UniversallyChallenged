import React, { Component, useState } from 'react';
import {View, Text, ScrollView, Picker} from 'react-native';
import { Button, TextInput } from 'react-native';
import { Formik } from 'formik';



class Teacher extends Component {
    state = {showBookForm : false, showPageForm : false}

    addBook = async (values) => {
        try {
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/book?bookTitle=' + values.bookTitle + '&bookCoverLink=none&school='+ global.school + '&classID=' + global.classid);
            if (response.ok) {
                console.log(response);
                let juice = await response.text();
                console.log(juice);
                this.setState({showBookForm: false})
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    addCreator = async (values) => {
        try {
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/');
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

    addPage = async (values) => {
        try {
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/');
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

    showBookForm = () => {
        return (
            <Formik
                initialValues={{ bookTitle:'', classId: -1}} //put class session variable here
                onSubmit={
                    values => this.addBook(values)
                }
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
                        <Button  title={'Close'} onPress={() => this.setState({showBookForm: false})}/>
                    </View>
                )}
            </Formik>
        );
    }

    showCreatorForm = () => {
        return (
            <Formik
                initialValues={{ bookTitle:'', classId: -1}} //put class session variable here
                onSubmit={
                    values => this.addBook(values)
                }
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
                        <Button  title={'Close'} onPress={() => this.setState({showPageForm: false})}/>
                    </View>
                )}
            </Formik>
        );
    }

    render() {
        return (
            <View className='manage-app'>
                <Button  title={'Add a Book'} onPress={() => this.setState({showBookForm: true})}/>
                {this.state.showBookForm ? this.showBookForm() : null}
                <Button  title={'Add a Book'} onPress={() => this.setState({showPageForm: true})}/>
                {this.state.showPageForm ? this.showCreatorForm() : null}
            </View>
        )
    }
}

export default Teacher
