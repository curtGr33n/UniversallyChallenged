import React, { Component } from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {login,page} from '../styles/styles'

class SplashScreen extends Component {
    waitForMe = async() => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                6000
            )
        )
    }

    async componentDidMount() {
        const data = await this.waitForMe();

        if (data !== null) {
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (
            <View style={login.layout}>
                <Image
                    style = {page.splash}
                    source={require('../assets/images/logo.png')}
                />
                <ActivityIndicator size="large" color="#bb904f"/>
            </View>
        );
    }
}

const styles = {
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    }
}

export default SplashScreen;