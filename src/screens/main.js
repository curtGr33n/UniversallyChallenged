import React, { Component } from 'react';
import {View, Text, TouchableHighlight, TouchableOpacity} from 'react-native';

//This is how you import the style sheet styles
// If another stylesheet is wanted add it with a , separator
// import {styles, another, more, soManyStyles} from ...
import {buttons, styles, page} from '../styles/styles'

class Main extends Component {
    render() {
        return (
            <View style={styles.center}>
                <Text style={page.title}>Home Page</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Library')}
                >
                    <View style={buttons.primary}>
                        <Text style={buttons.buttonText}>Library</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Library')}
                >
                    <View style={buttons.primary}>
                        <Text style={buttons.buttonText}>Stripes Earned</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <View style={buttons.primary}>
                        <Text style={buttons.buttonText}>Video Tutorial</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


export default Main;
