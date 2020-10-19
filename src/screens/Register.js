import React, { Component, useState } from 'react';
import {View, Text, Picker, ScrollView} from 'react-native';

//im really scared loool
import { Button, TextInput } from 'react-native';
import { Formik } from 'formik';

//This is how you import the style sheet
import {styles, buttons, forms, login} from '../styles/styles.js'
import {TouchableOpacity,TouchableHighlight, Image}  from "react-native";

class Register extends Component {

    getData = async (values) => {
        try {
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/register?name=' + values.name + '&email=' + values.email + '&password=' + values.password + '&type=' + values.type + '&school=' + values.school + '&classnum=' + values.classnum);
            if (response.ok) {
                let juice = await response.text();
                console.log(juice);
                if(juice.length != 0){
                    this.props.navigation.navigate('Login');
                }

                //return juice;
            } else {
                //noooo
            }
        } catch (error) {
            //console.error(error);
        }
    };

    MyReactNativeForm = props => (
        <View style={{flex: 1, justifyContent : 'center'}}>

        <Formik
            initialValues={{ name: '', email: '', password: '', type: '', school: '', classnum: '' }}
            onSubmit={
                values => this.getData(values)
            }
        >
            {({ handleChange,
                  handleBlur,
                  handleSubmit,
                  values }) => (
                <ScrollView style={forms.container}>
                    <View style={{alignItems: 'center'}}>
                        <TextInput
                            style={forms.bookInput}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            placeholder={'Name'}
                        />

                        <TextInput
                            style={forms.bookInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder={'Email'}
                        />

                        <TextInput
                            style={forms.bookInput}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder={'Password'}
                        />

                        <TextInput
                            style={forms.bookInput}
                            onChangeText={handleChange('type')}
                            onBlur={handleBlur('type')}
                            value={values.type}
                            placeholder={'Student/Teacher'}
                        />

                        <TextInput
                            style={forms.bookInput}
                            onChangeText={handleChange('school')}
                            onBlur={handleBlur('school')}
                            value={values.school}
                            placeholder={'School'}
                        />

                        <TextInput
                            style={forms.bookInput}
                            onChangeText={handleChange('classnum')}
                            onBlur={handleBlur('classnum')}
                            value={values.classnum}
                            placeholder={'Class Number'}
                        />

                        <TouchableHighlight
                            style={forms.buttonPrimary}
                            onPress={handleSubmit}
                        >
                            <Text style={login.buttonText}>Submit</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>

            )}
        </Formik>
        </View>
    );

    render() {
        return (
            <View style={{flex: 1, justifyContent : 'center'}}>
                <Text style={forms.title}>Sign Up</Text>
                <this.MyReactNativeForm />
            </View>
        )
    }
}

export default Register;
