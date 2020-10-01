import React, { Component, useState } from 'react';
import {View, Text, ScrollView, Picker} from 'react-native';
import { Button, TextInput } from 'react-native';
import { Formik } from 'formik';



class Teacher extends Component {
    state = {showBookForm : false, showPageForm : false, bookIds: ""}
    classIds = global.classid.map(i => (
        <Picker.Item label={i.toString()} value={i.toString()} />
    ));
   // bookIdItems = this.state.bookIds.map(i => (
     //   <Picker.Item label={i.bookTitle.toString()} value={i.bookId.toString()} />
    //));

    getClassBooks = async (values) => {
        try {
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/getClassBooks?classId=2');
            if (response.ok) {
                console.log(response);
                let juice = await response.text();
                console.log(juice);
                let data = JSON.parse(juice);
                this.setState({bookIds:data});
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    addBook = async (values) => {
        try {
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/book?bookTitle=' + values.bookTitle + '&bookCoverLink=none&school='+ global.school + '&classID=' + values.classId);
            console.log( values.classId);
            if (response.ok) {
                console.log(response);
                let juice = await response.text();
                console.log(juice);
                this.setState({showBookForm: false})
                this.setState({showPageForm : true})
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

    showBookForm = () => {
        return (
            <Formik
                initialValues={{ bookTitle:'', classId: global.classid[0]}} //put class session variable here
                onSubmit={
                    //values => this.addBook(values)
                    values => console.log(values)
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
                            {this.classIds}
                        </Picker>
                        <Button title='submit' color='red' onPress={props.handleSubmit} />
                        <Button  title={'Close'} onPress={() => this.setState({showBookForm: false})}/>
                    </View>
                )}
            </Formik>
        );
    }
    showPageForm = () => {
        return (
            <Formik
                initialValues={{ id:'', classId: global.classid[0]}} //put class session variable here
                onSubmit={
                    values => this.addBook(values)
                }
            >
                {(props) => (
                    <View>
                        <Picker
                            selectedValue={props.values.classId}
                            onValueChange={props.handleChange('classId')}>
                            {this.classIds}
                        </Picker>
                        <Picker
                            selectedValue={props.values.classId}
                            onValueChange={props.handleChange('classId')}>
                            {this.bookIdItems}
                        </Picker>
                        <Button title='submit' color='red' onPress={props.handleSubmit} />
                        <Button  title={'Close'} onPress={() => this.setState({showPageForm: false})}/>
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
                            {this.classIds}
                        </Picker>
                        <Button title='submit' color='red' onPress={props.handleSubmit} />
                        <Button  title={'Close'} onPress={() => this.setState({showPageForm: false})}/>
                    </View>
                )}
            </Formik>
        );
    }

    render() {
        //this.getClassBooks({test: "dfd"});
        return (
            <View className='manage-app'>
                <Button  title={'Add a Book'} onPress={() => this.setState({showBookForm: true})}/>
                {this.state.showBookForm ? this.showBookForm() : null}
                <Button  title={'Add Page'} onPress={() => this.setState({showPageForm: true})}/>
                {this.state.showPageForm ? this.showPageForm() : null}
                <Button  title={'test'} onPress={() => this.getClassBooks()}/>
            </View>
        )
    }
}

export default Teacher
