import React, {Component} from 'react';
import {Button, Picker, TextInput, View} from 'react-native';
import {Formik} from 'formik';


class Teacher extends Component {
    state = {showBookForm : false, showPageForm : false, showPageFormStage2 : false}
    classIds = global.classid.map(i => (
        <Picker.Item label={i.toString()} value={i.toString()} />
    ));
    bookIdItems;

    getClassBooks = async (values) => {
        try {
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/getClassBooks?classId=4');
            if (response.ok) {
                let juice = await response.text();
                return JSON.parse(juice);
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

    displayPage = (values) => {
        console.log("TEST****%%^$%$%#%$^%$^$^$%^%^$^%$^$%&&^%*%^&" + this.getClassBooks('4'));
        this.bookIdItems = this.getClassBooks(values.classId).value.map(i => (
        <Picker.Item label={i.bookTitle.toString()} value={i.bookId.toString()} />
        ));
        this.setState({showPageFormStage2: true});
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
                initialValues={{ id:'', classId: global.classid[0]}} //put class session variable here
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
                        <Button  title={'Close'} onPress={() => this.setState({showBookForm: false})}/>
                    </View>
                )}
            </Formik>
        );
    }

    showPageFormStageTwo = () => {
        return (
            <Formik
                initialValues={{ id:'', bookId: -1}} //put class session variable here
                onSubmit={
                    values => this.addBook(values)
                }
            >
                {(props) => (
                    <View>
                        <Picker
                            selectedValue={props.values.bookId}
                            onValueChange={props.handleChange('bookId')}>
                            {this.bookIdItems}
                        </Picker>
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
