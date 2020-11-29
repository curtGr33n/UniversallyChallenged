import React, { Component } from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {login,page} from '../styles/styles'

class SplashScreen extends Component {

    /**
     * Timer for loading on splash screen
     * @returns {Promise<unknown>}
     */
    waitForMe = async() => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                6000
            )
        )
    }

    /**
     * Animation for splash screen page.
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const data = await this.waitForMe();

        if (data !== null) {
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (
            <View style={login.layout}>

                {/* Logo */}
                <Image
                    style = {page.splash}
                    source={require('../assets/images/logo.png')}
                />

                {/* Loading element */}
                <ActivityIndicator size="large" color="#bb904f"/>

            </View>
        );
    }
}

export default SplashScreen;