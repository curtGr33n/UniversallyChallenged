import React, {Component, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import {buttons, styles, page, forms, modalStyle, login} from '../styles/styles';

class Main extends Component {

    state = {
        modalVisible: false
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { modalVisible } = this.state;

        return (
            <View style={styles.container}>

                {/* Page Title */}
                <Text style={page.title}>Home Page</Text>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={modalStyle.centeredView}>
                        <View style={modalStyle.modalView}>

                            {/* Video goes here */}

                            <TouchableOpacity
                                style={login.buttonPrimary}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={login.buttonText}>Close Tutorial</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Home Buttons */}
                <View style={page.homeButtons}>

                    {/* Library Button */}
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Library', {/* We can put params here use 'varNam: variable' */})}
                        style={page.primary}
                    >
                        <Image source={require('../assets/images/library.png')} style={page.image}/>
                        <Text style={buttons.buttonText}>Library</Text>

                    </TouchableOpacity>

                    {/* Teacher/Achievements Button */}
                    {
                        global.type === "teacher" ?
                        <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Teacher')}
                        style={page.primary}
                    >
                        <Image source={require('../assets/images/teacher_yellow.png')} style={page.image}/>
                        <Text style={buttons.buttonText}>Teacher Controls</Text>
                    </TouchableOpacity>
                        :
                        <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Library')}
                        style={page.primary}
                    >
                        <Image source={require('../assets/images/achievements.png')} style={page.image}/>
                        <Text style={buttons.buttonText}>Stripes Earned</Text>
                    </TouchableOpacity>
                    }

                    {/* Video Tutorial Button */}
                    <TouchableOpacity
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                        style={page.primary}
                    >
                        <Image source={require('../assets/images/video.png')} style={page.image}/>
                        <Text style={buttons.buttonText}>Video Tutorial</Text>
                    </TouchableOpacity>
                </View>

                {/* Buzz Image */}
                <Image source={require('../assets/images/buzz_words.png')} style={page.buzz}/>

            </View>
        )
    }
}

export default Main;