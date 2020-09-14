import React, { Component } from 'react';
import {View, Text, TouchableHighlight, TouchableOpacity} from 'react-native';

//This is how you import the style sheet styles
// If another stylesheet is wanted add it with a , separator
// import {styles, another, more, soManyStyles} from ...
import {buttons, styles} from '../styles/styles'



class Main extends Component {
    render() {
        return (
            <View style={styles.center}>
                <Text style={styles.title}>Main</Text>
                <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('Top Tabs')}
                >
                    <View style={buttons.primary}>
                        <Text style={buttons.buttonText}>Open Top Tabs</Text>
                    </View>
                </TouchableHighlight>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Bottom Tabs')}
                >
                    <View style={buttons.primary}>
                        <Text style={buttons.buttonText}>Open Bottom Tabs</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Pages')}
                >
                    <View style={buttons.primary}>
                        <Text style={buttons.buttonText}>Pages</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Library')}
                >
                    <View style={buttons.primary}>
                        <Text style={buttons.buttonText}>Library</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <View style={buttons.primary}>
                        <Text style={buttons.buttonText}>Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


export default Main;
