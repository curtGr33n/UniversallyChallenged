// If another stylesheet is wanted add it with a , separator
// import {styles, another, more, soManyStyles} from ...
import {buttons, styles, page} from '../styles/styles'
import React, {Component} from "react";
import {View, Text, TouchableOpacity} from 'react-native';

class Settings extends Component {
    render() {
        return (
            <View style={styles.container}>

                <Text style={page.title}>Settings</Text>

                <View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Library')}
                        style={page.primary}
                    >
                        <Text style={buttons.buttonText}>Library</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('WelcomeScreen')}
                        style={page.primary}
                    >
                        <Text style={buttons.buttonText}>Welcome Screen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Pages')}
                    >
                        <View style={buttons.primary}>
                            <Text style={buttons.buttonText}>Pages</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}
export default Settings;