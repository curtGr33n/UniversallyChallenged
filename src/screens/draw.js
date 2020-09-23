import React, {Component, createRef, useRef} from 'react';
import {View, TouchableOpacity, Image, AppRegistry} from 'react-native';

import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

import {buttons, styles, page, canvas} from '../styles/styles'
import Slider from "@react-native-community/slider";

export default class Draw extends Component {
    constructor(props) {
        super(props);
        this.myRef = createRef();
        this.brushMaxVal = 90;
    }

    state = {
        colorShow: false,
        color: "red",
        brushSizeShow: false,
        brushSize: 10
    };

    chooseColor (color) {
        if (color != null) {
            this.setState({
                color: color
            });
        }
        this.setState({
            colorShow: !this.state.colorShow
        });
    }

    toggleBrushWindow () {
        this.setState({
            brushSizeShow: !this.state.brushSizeShow
        });
    }

    changeBrushSize (value) {
        this.setState({
            brushSize: value
        });
    }

    render() {
        return (
            <View style={canvas.container}>
                <View style={{backgroundColor: '#fbf3dc', width: 100, height: 400,
                    flexDirection: 'column', justifyContent: "space-around", alignItems: "center"}}>
                    <TouchableOpacity
                        style={canvas.button}
                        onPress={() => this.chooseColor()}>
                        <Image
                            source={require("../assets/pencil.png")}
                            resizeMode="center"
                            style={canvas.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={canvas.button}
                        onPress={() => this.setState({color: "white"})}>
                        <Image
                            source={require("../assets/rubber.png")}
                            resizeMode="center"
                            style={canvas.icon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={canvas.button}
                        onPress={() => this.myRef.current.undo()}>
                        <Image
                            source={require("../assets/undo.png")}
                            resizeMode="center"
                            style={canvas.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={canvas.button}
                        onPress={() => this.toggleBrushWindow()}>
                        <Image
                            source={require("../assets/top.png")}
                            resizeMode="center"
                            style={canvas.icon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={canvas.button}/>
                </View>
                {this.state.colorShow ? (
                    <View style={canvas.colourPalette}>
                        <TouchableOpacity style={[canvas.button, canvas.red]}
                                          onPress={() => this.chooseColor("red")}/>
                        <TouchableOpacity style={[canvas.button, canvas.yellow]}
                                          onPress={() => this.chooseColor("yellow")}/>
                        <TouchableOpacity style={[canvas.button, canvas.green]}
                                          onPress={() => this.chooseColor("green")}/>
                        <TouchableOpacity style={[canvas.button, canvas.brown]}
                                          onPress={() => this.chooseColor("brown")}/>
                        <TouchableOpacity style={[canvas.button, canvas.black]}
                                          onPress={() => this.chooseColor("black")}/>
                    </View>
                    ) : null}
                {this.state.brushSizeShow ? (
                    <View style={canvas.colourPalette}>
                        <View style={{
                            borderRadius: this.brushMaxVal/2,
                            width: this.brushMaxVal,
                            height: this.brushMaxVal,
                            backgroundColor: "white",
                            position: "absolute",
                            // left: 5,
                            top: 10,
                            marginHorizontal: 5,

                        }}>
                            <View style={{
                                borderRadius: this.state.brushSize/2,
                                width: this.state.brushSize,
                                height: this.state.brushSize,
                                backgroundColor: "black",
                                position: "absolute",
                                top: (this.brushMaxVal - this.state.brushSize) / 2,
                                right: (this.brushMaxVal - this.state.brushSize) / 2
                            }}/>
                        </View>
                        <Slider
                            style={{width: 300, height: 80, transform: [{rotate: "-90deg"}], top: 60 }}
                            minimumValue={0}
                            maximumValue={this.brushMaxVal}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            value={this.state.brushSize}
                            onValueChange={(newSize) => this.changeBrushSize(newSize)}
                            onSlidingComplete={() => this.toggleBrushWindow()}
                        />
                    </View>
                ) : null}
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <SketchCanvas
                        ref={this.myRef}
                        style={{flex: 1, backgroundColor: 'white'}}
                        strokeColor={this.state.color}
                        strokeWidth={this.state.brushSize}
                    />
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('Draw', () => Draw);
