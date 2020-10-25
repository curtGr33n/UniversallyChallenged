import React, { Component } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { Formik } from 'formik';
import {login} from '../styles/styles.js'
import {TouchableOpacity, Image}  from "react-native";

class Login extends Component {
    /**
     * Gets the users details from the database and sets them as global variables
     * effectively logging them in
     * @values consists of the users email and password
     */
    getUser = async (values) => {
        if(values.email === ''){
            alert('Enter an Email');
            return;
        } else if( values.password === ''){
            alert('Enter a Password');
            return;
        }
        try {
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/login?email=' +
                values.email + '&password=' + values.password);
            if (response.ok) {
                let juicePrev = await response.text();
                if(!juicePrev.includes("{")){
                    alert(juicePrev);
                } else {
                    let juice = JSON.parse(juicePrev);
                    global.id = juice.id;
                    global.name = juice.name;
                    global.classid = juice.class;
                    global.school = juice.school;
                    global.type = juice.type;
                    global.mute = false;
                    this.props.navigation.navigate('Main');
                }
            } else {
                alert("HTTP-Error: " + response.status)
            }
        } catch (error) {
            alert(error);
        }
    };

    /**
     *The login form
     * Submits to getUser
     */
    LoginForm = props => (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={
                values => this.getUser(values)
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
                                    placeholder="bumble@uq.net.au"
                                />
                            </View>

                            {/* Text Input */}
                            <View style={login.inputContainer}>
                                <Text style={login.passwordText}>Password:</Text>
                                <TextInput
                                    style={login.input}
                                    secureTextEntry={true}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder="*************"
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
                    <this.LoginForm/>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

export default Login;
