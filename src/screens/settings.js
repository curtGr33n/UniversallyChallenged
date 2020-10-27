import {buttons, styles, page, login, forms} from '../styles/styles'
import React, {Component} from "react";
import {View, Text, TouchableOpacity, Image, Picker, ScrollView, KeyboardAvoidingView} from 'react-native';

class Settings extends Component {
    state={
        muteState:true
    }
    /**
     * Visualises the users classes
     */
    classIds = global.classid.map(i => (
        <Text>{i.toString()} </Text>
    ));

    /**
     * Mutes the applications audio
     * global.mute the actual mute
     * muteState deals with image change
     */
    needToMute = () => {
        if(global.mute === true){
            global.mute = false;
            this.setState({muteState: false});
        } else{
            global.mute = true;
            this.setState({muteState: true});
        }
    }

    /**
     * Logs out the user and resets the variables
     */
    logout = () => {
        global.id = "";
        global.name = "";
        global.classid = "";
        global.school = "";
        global.type = "";
    }
    render() {
        return (
            <View style={page.basicLayout}>

                {/* Page Title */}
                <View style={{width:'100%'}}>
                    <Text style={forms.title}>Settings</Text>
                </View>

                <ScrollView style={forms.container}>

                    <View style={page.centerLayout}>

                        <View style={page.rowLayout}>
                            <Text style={forms.input}>Name: {global.name}</Text>
                            <Text style={forms.input}>Role: {global.type}</Text>
                        </View>

                        <View style={page.rowLayout}>
                            <Text style={forms.input}>School: {global.school}</Text>
                            <Text style={forms.input}>Classes: {this.classIds}</Text>
                        </View>

                        <View style={page.rowLayout}>
                            <TouchableOpacity
                                onPress={() => this.needToMute()}
                                style={page.primary}
                            >
                                {this.state.muteState ?
                                    <View>
                                        <Image source={require('../assets/images/soundOn.png')}
                                               style={page.settingImage}/>
                                        <Text style={buttons.buttonText}>Mute</Text>
                                    </View>
                                    :
                                    <View>
                                        <Image source={require('../assets/images/soundOff.png')}
                                               style={page.settingImage}/>
                                        <Text style={buttons.buttonText}>Unmute</Text>
                                    </View>}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {this.logout(); this.props.navigation.navigate('Login');}}
                                style={page.primary}
                            >
                                <Image source={require('../assets/images/logout_grey.png')}
                                       style={page.settingImage}/>
                                <Text style={buttons.buttonText}>Logout</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {this.props.navigation.navigate("Draw")}}
                                style={page.primary}
                            >
                                <Image source={require('../assets/images/logout_grey.png')}
                                       style={page.settingImage}/>
                                <Text style={buttons.buttonText}>Draw</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
export default Settings;
