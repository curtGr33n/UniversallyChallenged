import React, { Component, useState } from 'react';
import { View, Text, Picker } from 'react-native';

//im really scared loool
import { Button, TextInput } from 'react-native';
import { Formik } from 'formik';

//This is how you import the style sheet
import { styles, buttons } from '../styles/styles.js'
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
                <View>
                    <TextInput
                        style={{ borderColor:'black', borderWidth:2 }}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name} 
                        placeholder={'name'}
                    />

                    <TextInput
                        style={{ borderColor: 'black', borderWidth: 2 }}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder={'email'}
                    />

                    <TextInput
                        style={{ borderColor:'black', borderWidth:2 }}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        placeholder={'password'}
                    />

                    <TextInput
                        style={{ borderColor:'black', borderWidth:2 }}
                        onChangeText={handleChange('type')}
                        onBlur={handleBlur('type')}
                        value={values.type}
                        placeholder={'student/teacher'}
                    />

                    <TextInput
                        style={{ borderColor:'black', borderWidth:2 }}
                        onChangeText={handleChange('school')}
                        onBlur={handleBlur('school')}
                        value={values.school}
                        placeholder={'school'}
                    />

                    <TextInput
                        style={{ borderColor:'black', borderWidth:2 }}
                        onChangeText={handleChange('classnum')}
                        onBlur={handleBlur('classnum')}
                        value={values.classnum}
                        placeholder={'classnum'}
                    />

                    <Button onPress={handleSubmit} title="Submit" />
                </View>
            )}
        </Formik>
    );

    render() {
        return (
            <View style={styles.container}>
                <this.MyReactNativeForm />
                <TouchableHighlight
                    style={buttons.primary}
                    onPress={() => this.props.navigation.navigate('Main')}
                >
                    <Text style={buttons.buttonText}>Login</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export default Register;
