import React, {Component, createRef, useRef} from 'react';
import {View, TouchableOpacity, Image, AppRegistry} from 'react-native';

import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

import {buttons, styles, page, canvas} from '../styles/styles'

export default class Draw extends Component {
    constructor(props) {
        super(props);
        this.myRef = createRef();
    }

    state = {
        show: false,
        color: "red",
    };

    chooseColor (color) {
        if (color != null) {
            this.setState({
                color: color
            });
        }
        this.setState({
            show: !this.state.show
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
                        style={canvas.button}/>

                    <TouchableOpacity
                        style={canvas.button}/>
                </View>
                {this.state.show ? (
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
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <SketchCanvas
                        ref={this.myRef}
                        style={{flex: 1, backgroundColor: 'white'}}
                        strokeColor={this.state.color}
                        strokeWidth={40}
                    />
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('Draw', () => Draw);
