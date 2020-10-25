import {buttons, styles, page, login, forms} from '../styles/styles'
import React, {Component} from "react";
import {View, Text, TouchableOpacity, Image, Picker} from 'react-native';

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
            <View style={styles.container}>
                {/* Page Title */}
                <Text style={page.title}>Settings</Text>
                <Text style={login.buttonText}>Logged in User</Text>
                <Text style={forms.creatorText}>Name: {global.name}</Text>
                <Text style={forms.creatorText}>Role: {global.type}</Text>
                <Text style={forms.creatorText}>School: {global.school}</Text>
                <Text style={forms.creatorText}>Class: {this.classIds}</Text>
                <View style={{flexDirection: 'row', justifyContent : 'center'}}>
                    <TouchableOpacity
                        onPress={() => this.needToMute()}
                        style={page.primary}
                    >
                        {this.state.muteState ?
                            <View><Image source={require('../assets/images/soundOn.png')} style={page.image}/>
                                <Text style={buttons.buttonText}>Mute</Text></View>
                            :
                            <View><Image source={require('../assets/images/soundOff.png')} style={page.image}/>
                                <Text style={buttons.buttonText}>un-Mute</Text></View>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this.logout(); this.props.navigation.navigate('Login');}}
                        style={page.primary}
                    >
                        <Image source={require('../assets/images/logout_grey.png')} style={page.image}/>
                        <Text style={buttons.buttonText}>Log-out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default Settings;
