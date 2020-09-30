import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

//This is how you import the style sheet styles
// If another stylesheet is wanted add it with a , separator
// import {styles, another, more, soManyStyles} from ...
import {buttons, styles, page} from '../styles/styles'

class Main extends Component {
    render() {
        return (
            <View style={styles.container}>

                <Text style={page.title}>Home Page</Text>

                <View style={page.homeButtons}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Library', {/* We can put params here use 'varNam: variable' */})}
                        style={page.primary}
                    >
                        <Image source={require('./images/library.png')} style={page.imageLib}/>
                        <Text style={buttons.buttonText}>Library</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Library')}
                        style={page.primary}
                    >
                        <Image source={require('./images/achievements.png')} style={page.imageMedal}/>
                        <Text style={buttons.buttonText}>Stripes Earned</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Library')}
                        style={page.primary}
                    >
                        <Image source={require('./images/video.png')} style={page.imageVideo}/>
                        <Text style={buttons.buttonText}>Video Tutorial</Text>
                    </TouchableOpacity>
                </View>

                <Image source={require('./images/buzz_words.png')} style={page.buzz}/>

            </View>
        )
    }
}




export default Main;
