import React, {Component} from 'react';
import {Button, Picker, TextInput, View} from 'react-native';
import {Field, Formik} from 'formik';
import {CheckBox} from "react-native-elements";


class Teacher extends Component {
    state = {
        showBookForm : false,
        showPageForm : false,
        showPageFormStage2 : false,
        bookSelectorOptions: [],
    }
    classIds = global.classid.map(i => (
        <Picker.Item label={i.toString()} value={i.toString()} />
    ));

    getClassBooks = async (values) => {
        try {
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/getClassBooks?classId=' + values.classId);
            if (response.ok) {
                let juice = await response.text();
                let data = JSON.parse(juice);
               // console.log(data);
                return data;
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

    displayPage = async (values) => {
        let classBooksDigits = await this.getClassBooks(values);
        let classBookSelection = classBooksDigits.map(i => (
            <Picker.Item label={i.bookTitle.toString()} value={i.bookId.toString()}/>
        ));
        this.setState({showPageFormStage2: true});
        this.setState({classBooks: classBooksDigits});
        this.setState({bookSelectorOptions: classBookSelection});
    };

    displayCreator = async (values) => {
        console.log(values.check);
    };

    addPage = async (values) => {
        try {
            console.log("*********************************************************");
            console.log(values.bookId);
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
                    values => this.addBook(values)
                    //values => console.log(values)
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
    showPageFormStageOne = () => {
        return (
            <Formik
                initialValues={{classId: global.classid[0]}} //put class session variable here
                onSubmit={
                    values => this.displayPage(values)
                }
            >
                {(props) => (
                    <View>
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

    showPageFormStageTwo = () => {
        return (
            <Formik
                initialValues={{ check: false, bookId: -1}}
                onSubmit={
                    values => this.displayCreator(values)
                }
            >
                {(props) => (
                    <View>
                        <Picker
                            selectedValue={props.values.bookId}
                            onValueChange={props.handleChange('bookId')}>
                            <Picker.Item label={"..."} value={"-1"}/>
                            {this.state.bookSelectorOptions}
                        </Picker>
                        <CheckBox
                            checkedIcon='check-box'
                            iconType='material'
                            uncheckedIcon='check-box-outline-blank'
                            title='Add a page'
                            checkedTitle='You are adding a page'
                            checked={props.values.check}
                            onPress={() => props.setFieldValue('check', !props.values.check)}
                        />
                        <Button title='Submit' color='red' onPress={props.handleSubmit} />
                        <Button  title={'Close'} onPress={() => this.setState({showPageFormStage2: false})}/>
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
                <Button  title={'Edit a Book'} onPress={() => this.setState({showPageForm: true})}/>
                {this.state.showPageForm ? this.showPageFormStageOne() : null}
                {this.state.showPageFormStage2 ? this.showPageFormStageTwo() : null}
            </View>
        )
    }
}

export default Teacher
