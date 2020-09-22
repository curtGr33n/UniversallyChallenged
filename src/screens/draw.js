import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

import {buttons, styles, page, canvas} from '../styles/styles'


export default class Draw extends Component {
    render() {
        return (
            <View style={canvas.container}>
                <View style={{backgroundColor: '#fbf3dc', width: 100, height: 400,
                    flexDirection: 'column', justifyContent: "space-around", alignItems: "center"}}>
                    <TouchableOpacity style={canvas.button}/>
                    <TouchableOpacity style={canvas.button}/>
                    <TouchableOpacity style={canvas.button}/>
                    <TouchableOpacity style={canvas.button}/>
                    <TouchableOpacity style={canvas.button}/>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <RNSketchCanvas
                        containerStyle={{backgroundColor: 'transparent', flex: 1}}
                        canvasStyle={{backgroundColor: 'transparent', flex: 1}}
                        defaultStrokeIndex={0}
                        defaultStrokeWidth={5}
                        closeComponent={
                            <View style={canvas.functionButton}>
                                <Text style={{color: 'white'}}>Close</Text>
                            </View>
                        }
                        undoComponent={
                            <View style={canvas.functionButton}>
                                <Text style={{color: 'white'}}>Undo</Text>
                            </View>
                        }
                        clearComponent={
                            <View style={canvas.functionButton}>
                                <Text style={{color: 'white'}}>Clear</Text>
                            </View>
                        }
                        eraseComponent={
                            <View style={canvas.functionButton}>
                                <Text style={{color: 'white'}}>Eraser</Text>
                            </View>
                        }
                        strokeComponent={(color) => (
                            <View
                                style={[{backgroundColor: color}, canvas.strokeColorButton]}
                            />
                        )}
                        strokeSelectedComponent={(color, index, changed) => {
                            return (
                                <View
                                    style={[
                                        {backgroundColor: color, borderWidth: 2},
                                        canvas.strokeColorButton,
                                    ]}
                                />
                            );
                        }}
                        strokeWidthComponent={(w) => {
                            return (
                                <View style={canvas.strokeWidthButton}>
                                    <View
                                        style={{
                                            backgroundColor: 'white',
                                            marginHorizontal: 2.5,
                                            width: Math.sqrt(w / 3) * 10,
                                            height: Math.sqrt(w / 3) * 10,
                                            borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                                        }}
                                    />
                                </View>
                            );
                        }}
                        saveComponent={
                            <View style={canvas.functionButton}>
                                <Text style={{color: 'white'}}>Save</Text>
                            </View>
                        }
                        savePreference={() => {
                            return {
                                folder: 'RNSketchCanvas',
                                filename: String(Math.ceil(Math.random() * 100000000)),
                                transparent: false,
                                imageType: 'png',
                            };
                        }}
                    />
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('Draw', () => Draw);
