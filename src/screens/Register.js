import React, {Component} from 'react';
import {Image, KeyboardAvoidingView, Picker, ScrollView, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {Formik} from 'formik';

//This is how you import the style sheet
import {forms, login} from '../styles/styles.js'

class Register extends Component {
    state = {
        schoolSelectorOptions: [],
        submitted: <Text/>
    }
    UNSAFE_componentWillMount() {
        this.displaySchools();
    }

    /**
     * Creates the picker options for the school options
     */
    displaySchools = async  () => {
        let schools = await this.getSchools();
        let test = schools.map(i => (
            <Picker.Item label={i.toString()} value={i.toString()}/>
        ));
        this.setState({schoolSelectorOptions: test});
    };

    /**
     * Retrieves all schools currently stored in the database
     * @returns {Array} An array of schools
     */
    getSchools = async () => {
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/getSchools');
            if (response.ok) {
                let juice = await response.text();
                return JSON.parse(juice);
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            alert(error);
        }
    };

    /**
     * Registers the user
     * @param values Their name, email, pasword, type, school, classnum
     */
    registerUser = async (values) => {
        try {
            if(values.school !== -1) {
                this.setState({submitted: <Text>Loading...</Text>});
                let response = await fetch(
                    'https://deco3801-universally-challenged.uqcloud.net/register?name=' +
                    values.name + '&email=' + values.email + '&password=' + values.password +
                    '&type=' + values.type + '&school=' + values.school + '&classnum=' +
                    values.classnum);
                if (response.ok) {
                    let juice = await response.text();
                    console.log(juice);
                    if (juice.length !== 0) {
                        this.props.navigation.navigate('Login');
                    }
                } else {
                    alert("HTTP-Error: " + response.status);
                }
            } else{
                alert("Select a School");
            }
        } catch (error) {
            alert(error);
        }
    };

    /**
     * The registration form
     * @returns {JSX.Element}
     */
    registerForm = () => {
        return (
        <View style={{flex: 1, justifyContent : 'center'}}>
            <Formik
                initialValues={{ name: '', email: '', password: '', type: 'student',
                    school: '-1', classnum: '' }}
                onSubmit={
                    values => this.registerUser(values)
                }
            >
                {(props) => (
                    <ScrollView style={forms.container}>
                        <View style={{alignItems: 'center'}}>
                            <TextInput
                                style={forms.bookInput}
                                onChangeText={props.handleChange('name')}
                                onBlur={props.handleBlur('name')}
                                value={props.values.name}
                                placeholder={'Name'}
                            />

                            <TextInput
                                style={forms.bookInput}
                                onChangeText={props.handleChange('email')}
                                onBlur={props.handleBlur('email')}
                                value={props.values.email}
                                placeholder={'Email'}
                            />

                            <TextInput
                                style={forms.bookInput}
                                onChangeText={props.handleChange('password')}
                                onBlur={props.handleBlur('password')}
                                value={props.values.password}
                                placeholder={'Password'}
                            />

                            <TextInput
                                style={forms.bookInput}
                                onChangeText={props.handleChange('classnum')}
                                onBlur={props.handleBlur('classnum')}
                                value={props.values.classnum}
                                placeholder={'Class Number'}
                            />

                            <View style={forms.dropDown}>
                                <Picker
                                    selectedValue={props.values.type}
                                    onValueChange={props.handleChange('type')}>
                                    <Picker.Item label={"Student"} value={"student"}/>
                                    <Picker.Item label={"Teacher"} value={"teacher"}/>
                                </Picker>
                            </View>

                            <View style={forms.dropDown}>
                                <Picker
                                    selectedValue={props.values.school}
                                    onValueChange={props.handleChange('school')}>
                                    <Picker.Item label={"Select a school"} value={"-1"}/>
                                    {this.state.schoolSelectorOptions}
                                </Picker>
                            </View>

                            <TouchableHighlight
                                style={forms.buttonPrimary}
                                onPress={props.handleSubmit}
                            >
                                <Text style={login.buttonText}>Submit</Text>
                            </TouchableHighlight>
                            {this.state.submitted}
                        </View>
                    </ScrollView>

                )}
            </Formik>
        </View>
    );
}

    render() {
        return (
            <View style={{flex: 1, justifyContent : 'center'}}>
                <Text style={forms.title}>Sign Up</Text>
                <this.registerForm />
            </View>
        )
    }
}

export default Register;
