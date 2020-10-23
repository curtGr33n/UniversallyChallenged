import React, { Component } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { Formik } from 'formik';

import {login} from '../styles/styles.js'
import {TouchableOpacity, Image}  from "react-native";

class Login extends Component {

    getData = async (values) => {
        try {
            global.user = "";
            //whatever the url is you want to get
            //console.log('deco3801-universally-challenged.uqcloud.net/login?email=' + values.email + '&password=' + values.password);
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/login?email=' + values.email + '&password=' + values.password);
            if (response.ok) {
                let juice = await response.text(); //id, name, classid, school
                /*if(juice.includes("teacher")){
                    global.user = "teacher";
                    this.props.navigation.navigate('Main');
                }
                else if(juice.includes("students")){
                    global.user = "student";
                    this.props.navigation.navigate('Main');
                }
                else{
                    global.user = "undefined";
                }*/
                //juice = juice.replace('"', " ");
                juice = JSON.parse(juice);
                console.log(juice);
                console.log(typeof(juice));
                if(juice.length !== 0){
                    //console.log(juice.id);
                    global.id = juice.id;
                    global.name = juice.name;
                    global.classid = juice.class;
                    global.school = juice.school;
                    global.type = juice.type;
                    global.mute = false;
                    this.props.navigation.navigate('Main');
                }

                //return juice;
            } else {
                //alert("HTTP-Error: " + response.status);
                //server isnt up if it makes it here
            }
        } catch (error) {
            //console.error(error);
        }
    };

    MyReactNativeForm = props => (

        /* Form Layout */
        <Formik
            // initialValues={{ email: '', password: '' }}
            initialValues={{email: 'eee@live.com.au', password: '1111'}}
            onSubmit={
                values => this.getData(values)
            }
        >
            {({ handleChange,
                  handleBlur,
                  handleSubmit,
                  values }) => (
                        <View style={login.container}>

                            {/* Text Input */}
                            <View style={login.inputContainer}>
                                <Text style={login.emailText}>Email:</Text>
                                <TextInput
                                    style={login.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    // placeholder="bumble@uq.net.au"
                                    placeholder="eee@live.com.au"
                                />
                            </View>

                            {/* Text Input */}
                            <View style={login.inputContainer}>
                                <Text style={login.buttonText}>Password:</Text>
                                <TextInput
                                    style={login.input}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    // placeholder="*************"
                                    placeholder="1111"
                                />
                            </View>

                            {/* Button (Signup/Login) */}
                            <View style={login.buttonContainer}>
                                <TouchableOpacity
                                    style={login.buttonPrimary}
                                    onPress={handleSubmit}
                                >
                                    <Text style={login.buttonText}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={login.buttonPrimary}
                                    onPress={() => this.props.navigation.navigate('Register')}
                                >
                                    <Text style={login.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Forgot Password Button */}
                            <TouchableOpacity
                                style={login.buttonBottom}
                                //onPress={() => this.props.navigation.navigate('Main')}
                            >
                                <Text style={login.buttonBottom}>forgot your login?</Text>
                            </TouchableOpacity>

                    </View>
            )}
        </Formik>
    );

    render() {
        return (
            <KeyboardAvoidingView
                style={login.layout}
                behavior="position"
                keyboardVerticalOffset={-1000}
            >
                <Image
                    style={login.logo}
                        source={require('../assets/images/logo.png')}
                    />
                <ScrollView>
                    <this.MyReactNativeForm/>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

export default Login;
