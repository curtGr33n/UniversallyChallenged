import React, { Component , useState} from 'react';
import {View, ImageBackground, TextInput, SafeAreaView } from 'react-native';
import Signature from 'react-native-signature-canvas';

//This is how you import the style sheet
import { styles } from '../styles/styles.js'

function Draw () {
    const [signature, setSignature] = useState(null)
    const [text, setText] = useState("Title")
        return (
            <SafeAreaView style={styles.view}>
                <ImageBackground
                    resizeMode="cover"
                    source={{uri: "https://www.apicloud.com/news_image/1481181873543_image002.jpg"}}
                    style={styles.container}>
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            width: "100%",
                            backgroundColor: "#FFF"
                        }}
                        onChangeText={(text) => setText(text)}
                        value={text}
                    />
                    <View style={{width: "100%", height: 700}}>
                        <Signature
                            onOK={(img) => setSignature(img)}
                            descriptionText="Sign"
                            clearText="Clear"
                            confirmText="Save"
                        />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
}

export default Draw;
