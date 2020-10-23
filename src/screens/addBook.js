import React, {Component} from 'react';
import {Picker, TextInput, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Modal} from 'react-native';
import {Formik} from 'formik';
import {buttons, forms, login} from '../styles/styles.js';

/**
 * Deals with adding a book
 */
class AddBook extends Component {
    state = {
        submitted: <Text/>,
        bookId: ""
    }
    /**
     * Creates the classId picker options based on logged in teacher
     * @type {JSX.Element} the picker option elements
     */
    classIds = global.classid.map(i => (
        <Picker.Item label={i.toString()} value={i.toString()} />
    ));

    /**
     * Adds a book to the database based on the values received
     * @param values contains classId to add the book to
     * @return the added books assigned ID
     */
    addBook = async (values) => {
        try {
            this.setState({submitted: <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    presentationStyle={"overFullScreen"}
                >
                    <View style={forms.modalOverlay}>
                        <ActivityIndicator size="large" color="#bb904f"/>
                    </View>
                </Modal>})
            if(values.classId !== -1) {
                let response = await fetch(
                    'https://deco3801-universally-challenged.uqcloud.net/book?bookTitle=' +
                    values.bookTitle + '&bookCoverLink=none&school=' + global.school +
                    '&classID=' + values.classId);
                if (!response.ok) {
                    alert("HTTP-Error: " + response.status);
                }else{
                    this.setState({submitted: <View style={{flexDirection: 'row', justifyContent : 'center', alignItems:'center'}}><Text style={forms.creatorText}>Book Submitted</Text><TouchableOpacity
                        style={forms.buttonSecondary}
                        onPress={() => {
                            this.deleteBook();
                        }}
                    >
                        <Text style={buttons.buttonTextWhite}>Undo Add</Text>
                    </TouchableOpacity></View>});
                    let bookId = await response.text();
                    this.setState({bookId: bookId});
                }
            } else{
                this.setState({submitted: <Text/>});
                alert("Select a Class Number");
            }
        } catch (error) {
            this.setState({submitted: <Text>{error}</Text>});
        }
    };

    /**
     * Deletes a book from the database
     */
    deleteBook = async () => {
        try {
            this.setState({submitted: <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    presentationStyle={"overFullScreen"}
                >
                    <View style={forms.modalOverlay}>
                        <ActivityIndicator size="large" color="#bb904f"/>
                    </View>
                </Modal>})
                let response = await fetch(
                    'https://deco3801-universally-challenged.uqcloud.net/deleteBook?bookId=' +
                    this.state.bookId);
                if (!response.ok) {
                    alert("HTTP-Error: " + response.status);
                }else{
                    this.setState({submitted: <Text style={forms.creatorText}>Book Deleted</Text>});
                }
        } catch (error) {
            this.setState({submitted: <Text>{error}</Text>});
        }
    };

    /**
     * Creates and displays the add book form
     * @returns {JSX.Element} The form
     */
    showBookForm = () => {
        return (
            <View style={{flex: 1, justifyContent : 'center'}}>

                {/* Page Title */}
                <Text style={forms.title}>Add Book</Text>

                {/* Form Layout */}
                <Formik
                    initialValues={{ bookTitle:'', classId: -1}}
                    onSubmit={
                        values => this.addBook(values)
                    }
                >
                    {(props) => (
                        <ScrollView style={forms.container}>
                            <View style={{alignItems: 'center'}}>

                                {/* Book Text Input */}
                                <TextInput
                                    style={forms.bookInput}
                                    placeholder= 'Add a book title...'
                                    onChangeText={props.handleChange('bookTitle')}
                                    value={props.values.bookTitle}
                                />

                                {/* Class Selection Dropdown */}
                                <View style={[forms.dropDown]}>
                                    <Picker
                                        selectedValue={props.values.classId}
                                        onValueChange={props.handleChange('classId')}>
                                        <Picker.Item label={"Class Number"} value={"-1"}/>
                                        {this.classIds}
                                    </Picker>
                                </View>

                                {/* Submit Button */}
                                {this.state.submitted}
                                <TouchableOpacity
                                    style={forms.buttonPrimary}
                                    onPress={props.handleSubmit}
                                >
                                    <Text style={login.buttonText}>Submit</Text>
                                </TouchableOpacity>

                                {/* Close Button */}
                                <TouchableOpacity
                                    style={forms.buttonPrimary}
                                    onPress={() => this.props.navigation.navigate('Teacher')}
                                >
                                    <Text style={login.buttonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    )}
                </Formik>
            </View>
        );
    }

    render() {
        return (
            this.showBookForm()
        )
    }
}

export default AddBook
