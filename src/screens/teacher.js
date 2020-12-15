import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles, buttons, page} from '../styles/styles.js';

/**
 * Displays the teacher option screen
 */
class Teacher extends Component {
    render() {
        return (
            <View style={styles.container}>

                {/* Page Title */}
                <View style={{width:'100%'}}>
                    <Text style={page.title}>Teacher Settings</Text>
                </View>

                {/* Navigation to Relevant Book/Teacher Controls */}
                <View style={[page.teacherButtons, page.offsetData]}>

                    {/* Add Book Navigation */}
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('addBook')}
                        style={page.primary}
                    >
                        <Image source={require('../assets/images/add_yellow.png')} style={page.image}/>
                        <Text style={buttons.buttonText}>Add Book</Text>
                    </TouchableOpacity>

                    {/* Add Page & Creators Navigation */}
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('editBook')}
                        style={page.primary}
                    >
                        <Image source={require('../assets/images/edit_yellow.png')} style={page.image}/>
                        <Text style={buttons.buttonText}>Manage Books</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
}

export default Teacher