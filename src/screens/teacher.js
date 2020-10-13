import React, {Component} from 'react';
import {Button, Picker, TextInput, View, Text} from 'react-native';
import {Field, Formik} from 'formik';
import {CheckBox} from "react-native-elements";
import {Drawer} from "react-native-paper";


class Teacher extends Component {
    state = {
        showBookForm : false,
        showPageForm : false,
        showPageFormStage2 : false,
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
        this.setState({showPageFormStage2: true});
        this.setState({bookSelectorOptions: classBookSelection});
        this.setState({classId: values.classId});
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
        this.setState({showPageFormStage3: true});
        this.setState({pageSelectorOptions: pageSelection});
        this.setState({bookId: values.bookId});
    };

    displayRoles = async (values) => {
        let creators = await this.getCreators(values);
        let exists = false;
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
        this.setState({pagenum: values.pagenum});
        this.setState({illustratorForm : this.showPageFormStageFour(illustrator)});
        this.setState({showIllustrator : true});
        this.setState({drawerForm : this.showPageFormStageFour(drawer)});
        this.setState({showDrawer : true});
        this.setState({authorForm : this.showPageFormStageFour(author)});
        this.setState({showAuthor : true});
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
                    values => this.displayBook(values)
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
                    values => this.displayPage(values)
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

    showPageFormStageThree = () => {
        return (
            <Formik
                initialValues={{pagenum: -1}}
                onSubmit={
                    values => this.displayRoles(values)
                }
            >
                {(props) => (
                    <View>
                        <Picker
                            selectedValue={props.values.pagenum}
                            onValueChange={props.handleChange('pagenum')}>
                            <Picker.Item label={"..."} value={"-1"}/>
                            {this.state.pageSelectorOptions}
                        </Picker>
                        <Button title='Submit' color='red' onPress={props.handleSubmit} />
                        <Button  title={'Close'} onPress={() => this.setState({showPageFormStage2: false})}/>
                    </View>
                )}
            </Formik>
        );
    }

    showPageFormStageFour = (values) => {
        if(values.needInput) {
            return (
                <Formik
                    initialValues={{sID: -1, role:values.role}}
                    onSubmit={
                        values => this.addCreator(values)
                    }
                >
                    {(props) => (
                        <View>
                            <Picker
                                selectedValue={props.values.pagenum}
                                onValueChange={props.handleChange('pagenum')}>
                                <Picker.Item label={"wait for Johann"} value={"-1"}/>

                            </Picker>
                            <Button title='Submit' color='red' onPress={props.handleSubmit}/>
                            <Button title={'Close'} onPress={() => this.setState({showPageFormStage2: false})}/>
                        </View>
                    )}
                </Formik>
            );
        } else{
            return (
                <View>
                    <Text>{values.sID}</Text>
                    <Text>{values.role}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View className='manage-app'>
                <Button  title={'Add a Book'} onPress={() => this.setState({showBookForm: true})}/>
                {this.state.showBookForm ? this.showBookForm() : null}
                <Button  title={'Edit a Book'} onPress={() => this.setState({showPageForm: true})}/>
                {this.state.showPageForm ? this.showPageFormStageOne() : null}
                {this.state.showPageFormStage2 ? this.showPageFormStageTwo() : null}
                {this.state.showPageFormStage3 ? this.showPageFormStageThree() : null}
                {this.state.showIllustrator ? this.state.illustratorForm : null}
                {this.state.showDrawer ? this.state.drawerForm : null}
                {this.state.showAuthor ? this.state.authorForm : null}

            </View>
        )
    }
}

export default Teacher
