import React, {Component} from 'react';
import {ActivityIndicator, Modal, Picker, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import {CheckBox} from "react-native-elements";
import {buttons, forms, login} from '../styles/styles.js';
import {page} from "../styles/styles";

/**
 * Allows users to be added to pages along with their role
 */
class EditBook extends Component {
    state = {
        showPageForm : true,
        stageOneValue: false,
        showPageFormStage2 : false,
        stageTwoValue: false,
        showPageFormStage3 : false,
        stageThreeValue: false,
        showPageFormStageTheme: false,
        showFormValue: false,
        showIllustrator: false,
        showBackground: false,
        showWriter: false,
        illustratorForm:'',
        backgroundForm:'',
        writerForm:'',
        bookSelectorOptions: [],
        pageSelectorOptions: [],
        sIDSelectorOptions: [],
        classId: -1,
        bookId: -1,
        bookName: "",
        pagenum: -1,
        theme: "",
        submitted: <Text/>,
    }

    /**
     * Picker Items for the classes
     * @type {JSX.Element} Picker items
     */
    classIds = global.classid.map(i => (
        <Picker.Item label={i.toString()} value={i.toString()} />
    ));

    /**
     * gets the books for a class
     * @param values holds the class ID
     * @returns {JSON.object} the books from the class ID
     */
    getClassBooks = async (values) => {
        this.setState({submitted:
            /* Loading Modal */
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    presentationStyle={"overFullScreen"}
                >
                    <View style={forms.modalOverlay}>
                        <ActivityIndicator size="large" color="#bb904f"/>
                    </View>
                </Modal>})
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/getClassBooks?classId=' +
                values.classId + '&school=' + global.school);
            if (response.ok) {
                let juice = await response.text();
                this.setState({submitted: <Text/>});
                return JSON.parse(juice);
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            this.setState({submitted: <Text>{error}</Text>});
        }
    };

    /**
     * Creates the picker of class Books and deals with form stage one submission
     * @param values contains the classId
     */
    displayBook = async (values) => {
        if(values.classId !== -1) {
            let classBooksDigits = await this.getClassBooks(values);
            let classBookSelection = await classBooksDigits.map(i => (
                <Picker.Item label={i.bookTitle.toString()} value={i.bookId.toString()}/>
            ));
            this.setState({classId: values.classId});
            this.setState({showPageForm: false});
            this.setState({stageOneValue: true});
            this.setState({showPageFormStage2: true});
            this.setState({bookSelectorOptions: classBookSelection});
        } else{
            alert("Select a Class Number");
        }
    };

    /**
     * Deletes a book from the database
     */
    deleteBook = async (values) => {
        try {
            this.setState({submitted:
                /* Loading Modal */
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.props.visible}
                        presentationStyle={"overFullScreen"}
                    >
                        <View style={forms.modalOverlay}>
                            <ActivityIndicator size="large" color="#bb904f"/>
                        </View>
                    </Modal>})
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/deleteBook?bookId=' +
                values.bookId);
            if (!response.ok) {
                alert("HTTP-Error: " + response.status);
            }
            this.setState({submitted: <Text/>});
        } catch (error) {
            this.setState({submitted: <Text>{error}</Text>});
        }
    };

    /**
     * Creates the picker for page numbers of the sent book
     * @param values contains the selected bookId
     */
    displayPage = async (values) => {
        if(values.bookId !== -1) {
            if (values.deleteBook) {
                await this.deleteBook(values);
                await this.displayBook({classId: this.state.classId});
            } else {
                if(values.numPages !== '') {
                    let numbers = /^[0-9]+$/;
                    if (values.numPages.match(numbers)) {
                        await this.addPages(values);
                    } else {
                        alert("Only enter numbers for adding pages")
                        return;
                    }
                }
                let pages = await this.getPages(values);
                let pageSelection = await pages.map(i => (
                    <Picker.Item label={"Page " + i.pagenum.toString()} value={i.pagenum.toString()}/>
                ));
                this.setState({bookId: values.bookId});
                let name = await this.getBookName({bookId: values.bookId});
                this.setState({showPageFormStage2: false});
                this.setState({bookName: name});
                this.setState({stageTwoValue: true});
                this.setState({pageSelectorOptions: pageSelection});
                this.setState({showPageFormStage3: true});
            }
        } else {
            alert("Select a Book");
        }
    };

    /**
     * Gets all the pages of a book
     * @param values contains the bookId
     * @returns an array of page objects from a book
     */
    getPages = async (values) => {
        this.setState({submitted:
            /* Loading Modal */
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    presentationStyle={"overFullScreen"}
                >
                    <View style={forms.modalOverlay}>
                        <ActivityIndicator size="large" color="#bb904f"/>
                    </View>
                </Modal>});
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/getPages?bookId=' +
                values.bookId);
            if (response.ok) {
                let juice = await response.text();
                this.setState({submitted: <Text/>})
                return JSON.parse(juice);
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            this.setState({submitted: <Text>{error}</Text>});
        }
    };

    /**
     * Adds a blank page to a book
     * @param values contains the bookId
     */
    addPages = async (values) => {
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/addPages?bookId='
                + values.bookId + '&number=' + values.numPages);
            if (!response.ok) {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            alert(error);
        }
    };

    /**
     * Adds a theme to a page
     * @param values contains the pageId
     */
    addTheme = async (values) => {
        this.setState({submitted:
            /* Loading Modal */
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    presentationStyle={"overFullScreen"}
                >
                    <View style={forms.modalOverlay}>
                        <ActivityIndicator size="large" color="#bb904f"/>
                    </View>
                </Modal>})
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/addTheme?bookId='
                + this.state.bookId + '&pageId=' + this.state.pagenum + '&theme=' + values.theme);
            if (!response.ok) {
                alert("HTTP-Error: " + response.status);
            } else{
                this.setState({theme: values.theme});
                this.setState({showPageFormStageTheme: false});
                this.setState({showFormValue: true});
            }
            this.setState({submitted: <Text/>});
        } catch (error) {
            this.setState({submitted: <Text/>});
            alert(error);
        }
    };

    /**
     * Deals with the roles and assigns the data to them
     * Also builds the picker for student ids
     * @param values contains the pagenum
     * @returns {Promise<void>}
     */
    displayRoles = async (values) => {
        this.setState({submitted:
            /* Loading Modal */
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    presentationStyle={"overFullScreen"}
                >
                    <View style={forms.modalOverlay}>
                        <ActivityIndicator size="large" color="#bb904f"/>
                    </View>
                </Modal>});
        if(values.pagenum !== -1) {
            let creators = await this.getCreators(values);
            let illustrator = {needInput: true, role: 'illustrator'};
            let background = {needInput: true, role: 'background'};
            let writer = {needInput: true, role: 'writer'};
             await creators.map(async (item) => {
                    if (item.role === "illustrator") {
                        let name = await this.getName({sId:item.studentId});
                        illustrator = {needInput: false, sID: item.studentId, role: item.role, name:name};
                    }
                    if (item.role === "background") {
                        let name = await this.getName({sId:item.studentId});
                        background = {needInput: false, sID: item.studentId, role: item.role, name:name};
                    }
                    if (item.role === "writer") {
                        let name = await this.getName({sId:item.studentId});
                        writer = {needInput: false, sID: item.studentId, role: item.role, name:name};
                    }
                }
            );
            let students = await this.getStudents();
            let studentsSelection = await students.map(i => (
                <Picker.Item label={i[1].toString()} value={i[0].toString()}/>
            ));
            this.setState({sIDSelectorOptions: studentsSelection});
            this.setState({pagenum: values.pagenum});
            this.setState({stageThreeValue: true});
            let theme = await this.getPage();
            if(theme.theme !== ""){
                this.setState({theme: theme.theme});
                this.setState({showFormValue: true});
                this.setState({showPageFormStageTheme: false});
            }else{
                this.setState({showPageFormStageTheme: true});
                this.setState({showFormValue: false});
            }
            this.setState({illustratorForm: this.showPageFormStageFour(illustrator)});
            this.setState({showIllustrator: true});
            this.setState({backgroundForm: this.showPageFormStageFour(background)});
            this.setState({showBackground: true});
            this.setState({writerForm: this.showPageFormStageFour(writer)});
            this.setState({showWriter: true});
            this.setState({submitted: <Text/>});
        }else{
            alert("Please select a page number")
        }
    };

    /**
     * Gets a page of a book
     * @param values contains the bookId
     * @returns an array of page objects from a book
     */
    getPage = async () => {
        this.setState({submitted:
            /* Loading Modal */
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    presentationStyle={"overFullScreen"}
                >
                    <View style={forms.modalOverlay}>
                        <ActivityIndicator size="large" color="#bb904f"/>
                    </View>
                </Modal>});
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/getPage?bookId=' +
                this.state.bookId + '&pageId=' + this.state.pagenum);
            if (response.ok) {
                let juice = await response.text();
                this.setState({submitted: <Text/>})
                return JSON.parse(juice);
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            this.setState({submitted: <Text>{error}</Text>});
        }
    };

    /**
     * Gets a students name via their id
     * @param values the students id
     */
    getName = async (values) => {
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/getName?sId='
                + values.sId);
            if (response.ok) {
                return await response.text();
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            this.setState({submitted: <Text>{error}</Text>});
        }
    };

    /**
     * Gets a books name via its id
     * @param values the students id
     */
    getBookName = async (values) => {
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/getBookName?bookId='
                + values.bookId);
            if (response.ok) {
                return await response.text();
            } else {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            alert(error);
        }
    };

    /**
     * Gets all the students in a class
     * @returns An array of user objects
     */
    getStudents = async () => {
        this.setState({submitted:
            /* Loading Modal */
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    presentationStyle={"overFullScreen"}
                >
                    <View style={forms.modalOverlay}>
                        <ActivityIndicator size="large" color="#bb904f"/>
                    </View>
                </Modal>});
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/getClassStudents?classId='
                + this.state.classId + '&school=' + global.school);
            if (response.ok) {
                let juice = await response.text();
                return JSON.parse(juice);
            } else {
                alert("HTTP-Error: " + response.status);
            }
            this.setState({submitted: <Text/>});
        } catch (error) {
            this.setState({submitted: <Text>{error}</Text>});
        }
    };

    /**
     * Adds a creator to a page in the book
     * @param values
     * @returns {Promise<void>}
     */
    addCreator = async (values) => {
        this.setState({submitted:
            /* Loading Modal */
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    presentationStyle={"overFullScreen"}
                >
                    <View style={forms.modalOverlay}>
                        <ActivityIndicator size="large" color="#bb904f"/>
                    </View>
                </Modal>});
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/addDetails?bookID=' +
                this.state.bookId + '&pageID='+ this.state.pagenum + '&sID=' + values.sID +
                '&role=' + values.role);
            if (response.ok) {
                await this.displayRoles({pagenum: this.state.pagenum});
                let returnText = await response.text();
                if(returnText === "student is already a creator"){
                    alert(returnText);
                }
            } else {
                alert("HTTP-Error: " + response.status);
            }
            this.setState({submitted: <Text/>});
        } catch (error) {
            this.setState({submitted: <Text>{error}</Text>});
        }
    };

    /**
     * gets the creators of a books page
     * @param values contains the selected pagenum
     * @returns an array of role objects
     */
    getCreators = async (values) => {
        this.setState({submitted:
            /* Loading Modal */
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    presentationStyle={"overFullScreen"}
                >
                    <View style={forms.modalOverlay}>
                        <ActivityIndicator size="large" color="#bb904f"/>
                    </View>
                </Modal>});
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/getCreator?bookId=' +
                this.state.bookId +"&pageId=" + values.pagenum);
            if (response.ok) {
                let juice = await response.text();
                return JSON.parse(juice);
            } else {
                alert("HTTP-Error: " + response.status);
            }
            this.setState({submitted: <Text/>});
        } catch (error) {
            this.setState({submitted: <Text>{error}</Text>});
        }
    };


    /**
     * Creates the form for selecting the classId
     * @returns {JSX.Element} the stage one form
     */
    showPageFormStageOne = () => {
        return (
            /* Form Layout */
            <Formik
                initialValues={{classId: -1}}
                onSubmit={
                    values => this.displayBook(values)
                }
            >
                {(props) => (
                    <View style={{alignItems: 'center'}}>
                        {/* Dropdown Layout */}
                        <View style={[forms.dropDown]}>
                            {/* Dropdown Selector */}
                            <Picker
                                selectedValue={props.values.classId}
                                onValueChange={props.handleChange('classId')}>
                                <Picker.Item label={"Select a Class Number..."} value={"-1"}/>
                                {this.classIds}
                            </Picker>
                        </View>
                        {/* Submite Button */}
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

    /**
     * Creates the form for selecting the book
     * @returns {JSX.Element} the stage two form
     */
    showPageFormStageTwo = () => {
        return (
            /* Form Layout */
            <Formik
                initialValues={{ numPages: '', bookId: -1, deleteBook: false}}
                onSubmit={
                    values => this.displayPage(values)
                }
            >
                {(props) => (
                    <View style={{alignItems: 'center'}}>
                        <View style={[forms.dropDown]}>
                            {/* Dropdown Selector */}
                            <Picker
                                selectedValue={props.values.bookId}
                                onValueChange={props.handleChange('bookId')}>
                                <Picker.Item label={"Select a Book..."} value={"-1"}/>
                                {this.state.bookSelectorOptions}
                            </Picker>
                        </View>
                        {/* Page add Text Input */}
                        <TextInput
                            style={forms.numberInput}
                            keyboardType = 'numeric'
                            placeholder = {"# Pages"}
                            onChangeText={props.handleChange('numPages')}
                            value={props.values.numPages}
                        />
                        <View style={{flexDirection: 'row', justifyContent : 'center', alignItems:'center'}}>
                            <TouchableOpacity
                                style={forms.buttonPrimary}
                                onPress={() => {props.setFieldValue('deleteBook', false);
                                props.handleSubmit();}}
                            >
                                <Text style={login.buttonText}>Edit Book</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={forms.buttonPrimary}
                                onPress={() => {props.setFieldValue('deleteBook', true);
                                props.handleSubmit();}}
                            >
                                <Text style={login.buttonText}>Delete Book</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        );
    }

    /**
     * Creates the form for selecting the page number
     * @returns {JSX.Element} the stage three form
     */
    showPageFormStageThree = () => {
        return (
            <Formik
                initialValues={{pagenum: -1}}
                onSubmit={
                    values => this.displayRoles(values)
                }
            >
                {(props) => (
                    <View style={page.rowLayout}>
                        <View style={[forms.dropDown]}>
                            <Picker
                                selectedValue={props.values.pagenum}
                                onValueChange={props.handleChange('pagenum')}>
                                <Picker.Item label={"Select a Page Number..."} value={"-1"}/>
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

    /**
     * Creates the form for selecting the students for a role
     * or shows the current student
     * @param values holds a need input value that determines
     *          whether to display the form or submitted information
     * @returns {JSX.Element} the stage four form
     */
    showPageFormStageFour = (values) => {
        if(values.needInput) {
            return (
                    /* Form Layout */
                <Formik
                    initialValues={{sID: -1, role: values.role}}
                    onSubmit={
                        values => this.addCreator(values)
                    }
                >
                    {(props) => (
                        <View style={{alignItems: 'center'}}>
                            <Text style={page.roleText}>{values.role}</Text>
                            <View style={[forms.dropDownHorizontal]}>
                                {/* Dropdown Selection */}
                                <Picker
                                    selectedValue={props.values.sID}
                                    onValueChange={props.handleChange('sID')}>
                                    <Picker.Item label={"..."} value={"-1"}/>
                                    {this.state.sIDSelectorOptions}
                                </Picker>
                            </View>

                            {/* Submit Button */}
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
                <View style={page.centerLayout}>
                    <Text style={login.buttonText}>{values.role} </Text>
                    <Text style={forms.creatorText}>{values.name}</Text>
                    <TouchableOpacity
                        style={forms.buttonPrimary}
                        onPress={() => {this.deleteRole({sID: values.sID})}}
                    >
                        <Text style={login.buttonText}>Un-Assign</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    /**
     * Displays the form to add a theme to the page
     * @return {JSX.Element} the form
     */
    addThemeForm = () => {
            return (
                /* Form Layout */
                <Formik
                    initialValues={{theme:""}}
                    onSubmit={
                        values => this.addTheme(values)
                    }
                >
                    {(props) => (
                        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                            <TextInput
                                style={forms.dropDownSmall}
                                placeholder={"Enter page theme here..."}
                                onChangeText={props.handleChange('theme')}
                                value={props.values.theme}
                            />

                            {/* Submit Button */}
                            <TouchableOpacity
                                style={forms.buttonPrimary}
                                onPress={props.handleSubmit}
                            >
                                <Text style={login.buttonText}>Add Theme</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            );
    }

    /**
     * Deletes a student role from a page
     */
    deleteRole = async (values) => {
        try {
            this.setState({submitted: <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    presentationStyle={"overFullScreen"}
                >
                    <View style={forms.modalOverlay}>
                        <ActivityIndicator size="large" color="#bb904f"/>
                    </View>
                </Modal>})
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/deleteCreator?studentId='+
                values.sID + '&bookId=' + this.state.bookId + '&pageId=' + this.state.pagenum);
            if (!response.ok) {
                alert("HTTP-Error: " + response.status);
            } else{
                await this.displayRoles({pagenum: this.state.pagenum});
            }
            this.setState({submitted: <Text/>});
        } catch (error) {
            this.setState({submitted: <Text>{error}</Text>});
        }
    };

    /**
     * Shows the submitted form value from stage One and allows editing
     * @returns {JSX.Element} the element to display information
     */
    showStageOneValue = () => {
        return (
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={buttons.buttonText}>Class Number: {this.state.classId}</Text>
                <TouchableOpacity
                    style={forms.buttonSecondary}
                    onPress={() => {
                        this.setState({showPageForm: true});
                        this.setState({stageOneValue: false});
                        this.setState({showPageFormStage2: false});
                        this.setState({stageTwoValue: false});
                        this.setState({showPageFormStage3: false});
                        this.setState({stageThreeValue: false});
                        this.setState({illustratorForm: false});
                        this.setState({backgroundForm: false});
                        this.setState({writerForm: false});
                        this.setState({showPageFormStageTheme: false});
                        this.setState({showFormValue: false});
                    }}
                    >
                    <Text style={buttons.buttonTextWhite}>Edit</Text>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * Shows the submitted form value from stage Two and allows editing
     * @returns {JSX.Element} the element to display information
     */
    showStageTwoValue = (values) => {
        return (
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={buttons.buttonText}>Book Title: {values.name}</Text>
                <TouchableOpacity
                    style={forms.buttonSecondary}
                    onPress={() => {
                        this.setState({showPageFormStage2: true});
                        this.setState({stageTwoValue: false});
                        this.setState({showPageFormStage3: false});
                        this.setState({showPageFormStageTheme: false});
                        this.setState({stageThreeValue: false});
                        this.setState({illustratorForm: false});
                        this.setState({backgroundForm: false});
                        this.setState({writerForm: false});
                        this.setState({showFormValue: false});
                    }}
                >
                    <Text style={buttons.buttonTextWhite}>Edit</Text>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * Shows the submitted form value from theme selection and allows editing
     * @returns {JSX.Element} the element to display information
     */
    showFormValue = () => {
        return (
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={buttons.buttonText}>Page Theme: {this.state.theme}</Text>
                <TouchableOpacity
                    style={forms.buttonSecondary}
                    onPress={() => {
                        this.setState({showPageFormStageTheme: true});
                        this.setState({showFormValue: false});
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

                {/* Page Title */}
                <View style={{width:'100%'}}>
                    <Text style={forms.title}>Edit Book</Text>
                </View>

                {/* Forms */}
                {this.state.submitted}
                {this.state.showPageForm ? this.showPageFormStageOne() : null}
                {this.state.stageOneValue ? this.showStageOneValue() : null}
                {this.state.showPageFormStage2 ? this.showPageFormStageTwo() : null}
                {this.state.stageTwoValue ? this.showStageTwoValue({name: this.state.bookName}) : null}
                {this.state.showPageFormStage3 ? this.showPageFormStageThree() : null}
                {this.state.stageThreeValue}
                {this.state.showPageFormStageTheme ? this.addThemeForm() : null}
                {this.state.showFormValue ? this.showFormValue() : null}
                {/* Display Roles as Row */}
                <View style={{flexDirection: 'row', justifyContent : 'center', margin: 40}}>
                    {this.state.showIllustrator ? this.state.illustratorForm : null}
                    {this.state.showBackground ? this.state.backgroundForm : null}
                    {this.state.showWriter ? this.state.writerForm : null}
                </View>
            </ScrollView>
        )
    }
}

export default EditBook
