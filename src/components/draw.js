import React, {Component, createRef} from 'react';
import {View, TouchableOpacity, Image, AppRegistry} from 'react-native';

import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

import {canvas} from '../styles/styles'
import Slider from "@react-native-community/slider";

export default class Draw extends Component {
    constructor(props) {
        super(props);
        this.myRef = createRef();
        this.brushMaxVal = 90;
    }

    state = {
        pColorShow: false,
        sColorShow: false,
        color: "red",
        brushSizeShow: false,
        brushSize: 10
    };

    /*
    Changes colors of the brush and shows the primary/secondary palette based on what screen is show
     */
    chooseColor (color) {
        if (!this.state.pColorShow && !this.state.sColorShow) {
            // if no color palettes are showing, show primary palette
            console.log("Showing primary")
            this.setState({
                pColorShow: true
            });
        } else if (this.state.pColorShow && !this.state.sColorShow) {
            // if primary palette is already showing, hide primary and show secondary palette
            console.log("Showing secondary")

            this.setState({
                pColorShow: false,
                sColorShow: true,
                color: color
            })
        } else if (!this.state.pColorShow && this.state.sColorShow) {
            // if color chosen is from secondary palette change color of brush
            console.log("Selecting color")
            this.setState({
                color: color,
                sColorShow: false
            })
        }
    }

    /*
    Toggles the brush window (eg, show or don't show)
     */
    toggleBrushWindow () {
        this.setState({
            brushSizeShow: !this.state.brushSizeShow
        });
    }

    /*
    Changes brush size based off the given value
     */
    changeBrushSize (value) {
        this.setState({
            brushSize: value
        });
    }

    /*
    The primary color palette
     */
    primaryColors () {
        const colors = ["red", "blue", "green", "brown", "black"];
        const colorComponents = colors.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                                  onPress={() => this.chooseColor(color)}/>)
        return(
            <View style={canvas.sideBar}>
                <>{colorComponents}</>
            </View>
        )
    }

    /*
    The secondary color palette is shown based on the given primary color
     */
    secondaryColors (color) {
        const red = ["red", "sandybrown", "crimson", "gold"];
        const blue = ["steelblue", "blue", "paleturquoise"];
        const green = ["olivedrab", "lightgreen", "green"];
        const brown = ["tan", "saddlebrown", "bisque", "brown"];
        const black = ["black"];

        if (color === "red") {
            const colorComponents = red.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                                  onPress={() => this.chooseColor(color)}/>)
            return (
                <View style={canvas.sideBar}>
                    <>{colorComponents}</>
                </View>
            )
        } else if (color === "blue") {
            const colorComponents = blue.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                                  onPress={() => this.chooseColor(color)}/>)
            return (
                <View style={canvas.sideBar}>
                    <>{colorComponents}</>
                </View>
            )
        } else if (color === "green") {
            const colorComponents = green.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                                  onPress={() => this.chooseColor(color)}/>)
            return (
                <View style={canvas.sideBar}>
                    <>{colorComponents}</>
                </View>
            )
        } else if (color === "brown") {
            const colorComponents = brown.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                                  onPress={() => this.chooseColor(color)}/>)
            return (
                <View style={canvas.sideBar}>
                    <>{colorComponents}</>
                </View>
            )
        } else if (color === "black") {
            const colorComponents = black.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                                  onPress={() => this.chooseColor(color)}/>)
            return (
                <View style={canvas.sideBar}>
                    <>{colorComponents}</>
                </View>
            )
        }
    }

    /*
    View that shows the brush adjuster
     */
    brushAdjuster () {
        return (
            <View style={canvas.sideBar}>
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
        );
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
                        style={canvas.button}
                        onPress={() => this.myRef.current.save('png', false, "CanvasSaves", "temp", false, false, false)}>
                        <Image
                            source={require("../assets/save.jpeg")}
                            resizeMode="center"
                            style={canvas.icon}
                        />
                    </TouchableOpacity>
                </View>
                {this.state.pColorShow ? (this.primaryColors()) : null}
                {this.state.sColorShow ? (this.secondaryColors(this.state.color)) : null}
                {this.state.brushSizeShow ? (this.brushAdjuster()) : null}
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
