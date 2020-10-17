import React, {Component} from 'react';
import {Button, Picker, TextInput, View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Field, Formik} from 'formik';
import {CheckBox} from "react-native-elements";
import {Drawer} from "react-native-paper";
import {styles, buttons, page, forms, login} from '../styles/styles.js';


class Teacher extends Component {
    state = {
        showPageForm : true,
        stageOneValue: false,
        showPageFormStage2 : false,
        stageTwoValue: false,
        showPageFormStage3 : false,
        showPageFormStage4: false,
        showIllustrator: false,
        showDrawer: false,
        showAuthor: false,
        illustratorForm:'',
        drawerForm:'',
        authorForm:'',
        bookSelectorOptions: [],
        pageSelectorOptions: [],
        sIDSelectorOptions: [],
        classId: -1,
        bookId: -1,
        pagenum: -1
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
                return data;
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    addCreator = async (values) => {
        try {
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/addDetails?bookID=' + this.state.bookId + '&pageID='+ this.state.pagenum + '&sID=' + values.sID + '&role=' + values.role);
            if (response.ok) {
                // console.log(response);
                let juice = await response.text();
                //console.log(juice);
                if(juice.ok) {
                   await this.displayRoles({pagenum: this.state.pagenum})
                }
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    displayBook = async (values) => {
        let classBooksDigits = await this.getClassBooks(values);
        let classBookSelection = classBooksDigits.map(i => (
            <Picker.Item label={i.bookTitle.toString()} value={i.bookId.toString()}/>
        ));
        this.setState({classId: values.classId});
        this.setState({showPageForm: false});
        this.setState({stageOneValue: true});
        this.setState({showPageFormStage2: true});
        this.setState({bookSelectorOptions: classBookSelection});
    };

    displayPage = async (values) => {
        console.log(values.check);
        console.log(values.bookId);
        if(values.check){
            await this.addPage(values);
        }
        let pages = await this.getPages(values);
        let pageSelection = pages.map(i => (
            <Picker.Item label={i.pagenum.toString()} value={i.pagenum.toString()}/>
        ));
        this.setState({bookId: values.bookId});
        this.setState({showPageFormStage2: false});
        this.setState({stageTwoValue: true});
        this.setState({pageSelectorOptions: pageSelection});
        this.setState({showPageFormStage3: true});
    };

    displayRoles = async (values) => {
        let creators = await this.getCreators(values);
        let illustrator = {needInput: true, role: 'illustrator'};
        let drawer = {needInput: true, role: 'drawer'};
        let author = {needInput: true, role: 'author'};
        console.log(creators);
        console.log(values.pagenum);
        creators.map((item) => {
                if(item.role === "illustrator"){
                    illustrator = {needInput: false, sID: item.studentId, role: item.role};
                }
                if(item.role === "drawer"){
                    drawer = {needInput: false, sID: item.studentId, role: item.role};
                }
                if(item.role === "author"){
                    author = {needInput: false, sID: item.studentId, role: item.role};
                }
            }
        );
        console.log(illustrator);
        let students = await this.getStudents();
        let studentsSelection = students.map(i => (
            <Picker.Item label={i[1].toString()} value={i[0].toString()}/>
        ));
        this.setState({sIDSelectorOptions: studentsSelection});
        this.setState({pagenum: values.pagenum});
        this.setState({illustratorForm : this.showPageFormStageFour(illustrator)});
        this.setState({showIllustrator : true});
        this.setState({drawerForm : this.showPageFormStageFour(drawer)});
        this.setState({showDrawer : true});
        this.setState({authorForm : this.showPageFormStageFour(author)});
        this.setState({showAuthor : true});
    };

    getStudents = async () => {
        try {
            console.log(this.state.classId);
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/getClassStudents?classId=' + this.state.classId);
            console.log(response);
            if (response.ok) {
                console.log(response);
                let juice = await response.text();
                let data = JSON.parse(juice);
                return data;
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    getCreators = async (values) => {
        try {
            console.log(values.pagenum);
            console.log(this.state.bookId);
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/getCreator?bookId=' + this.state.bookId +"&pageId=" + values.pagenum);
            console.log(response);
            if (response.ok) {
                console.log(response);
                let juice = await response.text();
                let data = JSON.parse(juice);
                return data;
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    getPages = async (values) => {
        try {
            console.log("*********************************************************");
            console.log(values.bookId);
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/getPages?bookId=' + values.bookId);
            if (response.ok) {
                console.log(response);
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

    addPage = async (values) => {
        try {
            console.log("*********************************************************");
            console.log(values.bookId);
            let response = await fetch('https://deco3801-universally-challenged.uqcloud.net/createPage?id=' + values.bookId);
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

    showPageFormStageOne = () => {
        return (
            <Formik
                initialValues={{classId: global.classid[0]}} //put class session variable here
                onSubmit={
                    values => this.displayBook(values)
                }
            >
                {(props) => (
                    <View style={{alignItems: 'center'}}>
                        <View style={[forms.dropDown]}>
                            <Picker
                                selectedValue={props.values.classId}
                                onValueChange={props.handleChange('classId')}>
                                <Picker.Item label={"Class Id"} value={"-1"}/>
                                {this.classIds}
                            </Picker>
                        </View>
                        <TouchableOpacity
                            style={forms.buttonPrimary}
                            onPress={props.handleSubmit}
                        >
                            <Text style={login.buttonText}>Submit</Text>
                        </TouchableOpacity>
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
                    values => this.displayPage(values)
                }
            >
                {(props) => (
                    <View style={{alignItems: 'center'}}>
                        <View style={[forms.dropDown]}>
                            <Picker
                                selectedValue={props.values.bookId}
                                onValueChange={props.handleChange('bookId')}>
                                <Picker.Item label={"..."} value={"-1"}/>
                                {this.state.bookSelectorOptions}
                            </Picker>
                        </View>
                        <CheckBox
                            checkedIcon='check-box'
                            iconType='material'
                            uncheckedIcon='check-box-outline-blank'
                            title='Add a page'
                            checkedTitle='You are adding a page'
                            checked={props.values.check}
                            onPress={() => props.setFieldValue('check', !props.values.check)}
                        />
                        <TouchableOpacity
                            style={forms.buttonPrimary}
                            onPress={props.handleSubmit}
                        >
                            <Text style={login.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        );
    }

    showPageFormStageThree = () => {
        return (
            <Formik
                initialValues={{pagenum: -1}}
                onSubmit={
                    values => this.displayRoles(values)
                }
            >
                {(props) => (
                    <View style={{alignItems: 'center'}}>
                        <View style={[forms.dropDown]}>
                            <Picker
                                selectedValue={props.values.pagenum}
                                onValueChange={props.handleChange('pagenum')}>
                                <Picker.Item label={"..."} value={"-1"}/>
                                {this.state.pageSelectorOptions}
                            </Picker>
                        </View>
                        <TouchableOpacity
                            style={forms.buttonPrimary}
                            onPress={props.handleSubmit}
                        >
                            <Text style={login.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        );
    }

    showPageFormStageFour = (values) => {
        if(values.needInput) {
            return (
                <Formik
                    initialValues={{sID: -1, role: values.role}}
                    onSubmit={
                        values => this.addCreator(values)
                    }
                >
                    {(props) => (
                        <View style={{alignItems: 'center'}}>
                            <Text style={login.buttonText}>{values.role}</Text>
                            <View style={[forms.dropDown]}>
                                <Picker
                                    selectedValue={props.values.sID}
                                    onValueChange={props.handleChange('sID')}>
                                    <Picker.Item label={"..."} value={"-1"}/>
                                    {this.state.sIDSelectorOptions}
                                </Picker>
                            </View>
                            <TouchableOpacity
                                style={forms.buttonPrimary}
                                onPress={props.handleSubmit}
                            >
                                <Text style={login.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            );
        } else{
            return (
                <View style={{alignItems: 'center'}}>
                    <Text>{values.sID}</Text>
                    <Text>{values.role}</Text>
                </View>
            );
        }
    }

    showStageOneValue = () => {
        return (
            <View style={{alignItems: 'center'}}>
            <Text style={buttons.buttonText}>ClassID = {this.state.classId}</Text>
                <TouchableOpacity
                    style={forms.buttonSecondary}
                    onPress={() => {
                        this.setState({showPageForm: true});
                        this.setState({stageOneValue: false});
                        this.setState({showPageFormStage2: false});
                        this.setState({stageTwoValue: false});
                        this.setState({showPageFormStage3: false});
                        this.setState({illustratorForm: false});
                        this.setState({drawerForm: false});
                        this.setState({authorForm: false});
                    }}
                >
                    <Text style={buttons.buttonTextWhite}>Edit</Text>
                </TouchableOpacity>
            </View>
        );
    }

    showStageTwoValue = () => {
        return (
            <View style={{alignItems: 'center'}}>
                <Text style={buttons.buttonText}>BookID = {this.state.bookId}</Text>

                <TouchableOpacity
                    style={forms.buttonSecondary}
                    onPress={() => {
                        this.setState({showPageFormStage2: true});
                        this.setState({stageTwoValue: false});
                    }}
                >
                    <Text style={buttons.buttonTextWhite}>Edit</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={{backgroundColor:'#feecb1', flex: 1}}>
                <Text style={forms.title}>Edit Book</Text>
                    {this.state.showPageForm ? this.showPageFormStageOne() : null}
                    {this.state.stageOneValue ? this.showStageOneValue() : null}
                    {this.state.showPageFormStage2 ? this.showPageFormStageTwo() : null}
                    {this.state.stageTwoValue ? this.showStageTwoValue() : null}
                    {this.state.showPageFormStage3 ? this.showPageFormStageThree() : null}
                    {this.state.showIllustrator ? this.state.illustratorForm : null}
                    {this.state.showDrawer ? this.state.drawerForm : null}
                    {this.state.showAuthor ? this.state.authorForm : null}
            </ScrollView>
        )
    }
}

export default Teacher
