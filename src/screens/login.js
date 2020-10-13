import React, { Component } from 'react';
import { View, Text } from 'react-native';

//im really scared loool
import { Button, TextInput } from 'react-native';
import { Formik } from 'formik';

//This is how you import the style sheet
import { styles, buttons } from '../styles/styles.js'
import {TouchableOpacity,TouchableHighlight, Image}  from "react-native";

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
                if(juice.length != 0){
                    //console.log(juice.id);
                    global.id = juice.id;
                    global.name = juice.name;
                    global.classid = juice.class;
                    global.school = juice.school;
                    global.type = juice.type;

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
        <Formik
            initialValues={{ email: '', password: '' }}
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
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    <TextInput
                        style={{ borderColor: 'black', borderWidth: 2 }}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
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

                <TouchableHighlight
                    style={buttons.primary}
                    onPress={() => this.props.navigation.navigate('Register')}
                >
                    <Text style={buttons.buttonText}>Register</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export default Login;
