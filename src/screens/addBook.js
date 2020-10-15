import React, {Component} from 'react';
import {Picker, TextInput, View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {forms, login} from '../styles/styles.js';

class Book extends Component {
    state = {
        showBookForm : false,
    }
    classIds = global.classid.map(i => (
        <Picker.Item label={i.toString()} value={i.toString()} />
    ));

    addBook = async (values) => {
        try {
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/book?bookTitle=' + values.bookTitle + '&bookCoverLink=none&school='+ global.school + '&classID=' + values.classId);
            if (response.ok) {
               // console.log(response);
                let juice = await response.text();
                //console.log(juice);
                this.setState({showBookForm: false})
                this.setState({showPageForm : true})
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };


    showBookForm = () => {
        return (
            <View style={{flex: 1, justifyContent : 'center'}}>
                <Text style={forms.title}>Add Book</Text>
                <Formik
                    initialValues={{ bookTitle:'', classId: global.classid[0]}} //put class session variable here
                    onSubmit={
                        values => this.addBook(values)
                        //values => console.log(values)
                    }
                >
                    {(props) => (
                        <ScrollView style={forms.container}>
                            <View style={{alignItems: 'center'}}>
                                <TextInput
                                    style={forms.bookInput}
                                    placeholder= 'Add a book title...'
                                    onChangeText={props.handleChange('bookTitle')}
                                    value={props.values.bookTitle}
                                />
                                <View style={[forms.dropDown]}>
                                    <Picker
                                        selectedValue={props.values.classId}
                                        onValueChange={props.handleChange('classId')}>
                                        {this.classIds}
                                    </Picker>
                                </View>
                                <TouchableOpacity
                                    style={forms.buttonPrimary}
                                    onPress={() => this.props.handleSubmit}
                                >
                                    <Text style={login.buttonText}>Submit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={forms.buttonPrimary}
                                    onPress={() => this.setState({showBookForm: false})}
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

export default Book
