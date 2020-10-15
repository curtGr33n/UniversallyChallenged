import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles, buttons, page} from '../styles/styles.js';

class Teacher extends Component {
    render() {
        return (
            <View style={styles.container}>

                <Text style={page.title}>Teacher Settings</Text>
                <View style={[page.homeButtons, page.offsetData]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('addBook')}
                        style={page.primary}
                    >
                        <Image source={require('../assets/images/library.png')} style={page.image}/>
                        <Text style={buttons.buttonText}>Add Book</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('editBook')}
                        style={page.primary}
                    >
                        <Image source={require('../assets/images/library.png')} style={page.image}/>
                        <Text style={buttons.buttonText}>Add Page & Creators</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default Teacher
