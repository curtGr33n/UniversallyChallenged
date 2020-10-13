import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

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
                        <Image source={require('../assets/images/library.png')} style={page.image}/>
                        <Text style={buttons.buttonText}>Library</Text>
{/*<<<<<<< HEAD*/}
{/*                    </View>*/}
{/*                </TouchableOpacity>*/}
{/*                <TouchableOpacity*/}
{/*                    onPress={() => this.props.navigation.navigate('Login')}*/}
{/*                >*/}
{/*                    <View style={buttons.primary}>*/}
{/*                        <Text style={buttons.buttonText}>Login</Text>*/}
{/*                    </View>*/}
{/*                </TouchableOpacity>*/}
{/*                <TouchableOpacity*/}
{/*                    onPress={() => this.props.navigation.navigate('Draw')}*/}
{/*                >*/}
{/*                    <View style={buttons.primary}>*/}
{/*                        <Text style={buttons.buttonText}>Draw</Text>*/}
{/*                    </View>*/}
{/*                </TouchableOpacity>*/}
{/*                <TouchableOpacity*/}
{/*                    onPress={() => this.props.navigation.navigate('ViewSnapShot')}*/}
{/*                >*/}
{/*                    <View style={buttons.primary}>*/}
{/*                        <Text style={buttons.buttonText}>ViewSnapShot</Text>*/}
{/*                    </View>*/}
{/*                </TouchableOpacity>*/}
{/*=======*/}

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Library')}
                        style={page.primary}
                    >
                        <Image source={require('../assets/images/achievements.png')} style={page.image}/>
                        <Text style={buttons.buttonText}>Stripes Earned</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Library')}
                        style={page.primary}
                    >
                        <Image source={require('../assets/images/video.png')} style={page.image}/>
                        <Text style={buttons.buttonText}>Video Tutorial</Text>
                    </TouchableOpacity>
                </View>

                <Image source={require('../assets/images/buzz_words.png')} style={page.buzz}/>

{/*>>>>>>> 33fea3c232d4dc4bd0f77dc3148e6462b8de5ba0*/}
            </View>
        )
    }
}




export default Main;
