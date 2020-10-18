import React, {Component} from 'react';
import {Picker, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import {CheckBox} from "react-native-elements";
import {buttons, forms, login} from '../styles/styles.js';

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
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/getClassBooks?classId=' +
                values.classId);
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

    /**
     * Creates the picker of class Books and deals with form stage one submission
     * @param values contains the classId
     */
    displayBook = async (values) => {
        if(values.classId !== -1) {
            let classBooksDigits = await this.getClassBooks(values);
            let classBookSelection = classBooksDigits.map(i => (
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
     * Creates the picker for page numbers of the sent book
     * @param values contains the selected bookId
     */
    displayPage = async (values) => {
        if(values.bookId !== -1) {
            if (values.check) {
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
        }else{
            alert("Select a Book");
        }
    };

    /**
     * Gets all the pages of a book
     * @param values contains the bookId
     * @returns an array of page objects from a book
     */
    getPages = async (values) => {
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/getPages?bookId=' +
                values.bookId);
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

    /**
     * Adds a blank page to a book
     * @param values contains the bookId
     */
    addPage = async (values) => {
        try {
            console.log(values.bookId);
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/createPage?id='
                + values.bookId);
            if (!response.ok) {
                alert("HTTP-Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Deals with the roles and assigns the data to them
     * Also builds the picker for student ids
     * @param values contains the pagenum
     * @returns {Promise<void>}
     */
    displayRoles = async (values) => {
        if(values.pagenum !== -1) {
            let creators = await this.getCreators(values);
            let illustrator = {needInput: true, role: 'illustrator'};
            let drawer = {needInput: true, role: 'drawer'};
            let author = {needInput: true, role: 'author'};
            creators.map((item) => {
                    if (item.role === "illustrator") {
                        illustrator = {needInput: false, sID: item.studentId, role: item.role};
                    }
                    if (item.role === "drawer") {
                        drawer = {needInput: false, sID: item.studentId, role: item.role};
                    }
                    if (item.role === "author") {
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
            this.setState({illustratorForm: this.showPageFormStageFour(illustrator)});
            this.setState({showIllustrator: true});
            this.setState({drawerForm: this.showPageFormStageFour(drawer)});
            this.setState({showDrawer: true});
            this.setState({authorForm: this.showPageFormStageFour(author)});
            this.setState({showAuthor: true});
        }else{
            alert("Please select a page number")
        }
    };

    /**
     * Gets all the students in a class
     * @returns An array of user objects
     */
    getStudents = async () => {
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/getClassStudents?classId='
                + this.state.classId);
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

    /**
     * Adds a creator to a page in the book
     * @param values
     * @returns {Promise<void>}
     */
    addCreator = async (values) => {
        try {
            let response = await fetch(
                'https://deco3801-universally-challenged.uqcloud.net/addDetails?bookID=' +
                this.state.bookId + '&pageID='+ this.state.pagenum + '&sID=' + values.sID +
                '&role=' + values.role);
            if (response.ok) {
                let juice = await response.text();
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

    /**
     * gets the creators of a books page
     * @param values contains the selected pagenum
     * @returns an array of role objects
     */
    getCreators = async (values) => {
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
        } catch (error) {
            console.error(error);
        }
    };


    /**
     * Creates the form for selecting the classId
     * @returns {JSX.Element} the stage one form
     */
    showPageFormStageOne = () => {
        return (
            <Formik
                initialValues={{classId: -1}}
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
                                <Picker.Item label={"Class Number"} value={"-1"}/>
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

    /**
     * Creates the form for selecting the book
     * @returns {JSX.Element} the stage two form
     */
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
                                <Picker.Item label={"Select a Book"} value={"-1"}/>
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
                    <View style={{alignItems: 'center'}}>
                        <View style={[forms.dropDown]}>
                            <Picker
                                selectedValue={props.values.pagenum}
                                onValueChange={props.handleChange('pagenum')}>
                                <Picker.Item label={"Select a Page Number"} value={"-1"}/>
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

    /**
     * Shows the submitted form value from stage One and allows editing
     * @returns {JSX.Element} the element to display information
     */
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

    /**
     * Shows the submitted form value from stage Two and allows editing
     * @returns {JSX.Element} the element to display information
     */
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

export default EditBook
