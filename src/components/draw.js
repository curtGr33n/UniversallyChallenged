import React, {Component, createRef, useState} from 'react';
import {View, TouchableOpacity, Image, AppRegistry, Text} from 'react-native';

import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

import {canvas} from '../styles/styles'
import Slider from "@react-native-community/slider";

export function Draw () {
    const brushMaxVal = 90;
    const [ref, setRef] = useState(null);
    const [image, setImage] = useState(null);
    const [pColorShow, setPColorShow] = useState(false);
    const [sColorShow, setSColorShow] = useState(false);
    const [color, setColor] = useState("red");
    const [brushSizeShow, setBrushSizeShow] = useState(false);
    const [brushSize, setBrushSize] = useState(10);

    const saveCanvas = async () => {
        if (image != null) {
            try {
                const url = 'https://deco3801-universally-challenged.uqcloud.net/addImageToCreator';
                let response = await fetch(url, {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            bookId: 11,
                            pageId: 0,
                            studentId: 3,
                            image: image
                        }).replace(/\\n/g, "")
                });
                if (response.ok) {
                    console.log("base64 sent to server successfully");
                } else {
                    console.log("response not received");
                }
            } catch (error) {
                console.error(error);
                console.log("caught error");

            }
        }
    };

    /*
    Changes colors of the brush and shows the primary/secondary palette based on what screen is show
     */
    const chooseColor = (color) => {
        if (!pColorShow && !sColorShow) {
            // if no color palettes are showing, show primary palette
            console.log("Showing primary")
            setPColorShow(true);
        } else if (pColorShow && !sColorShow) {
            // if primary palette is already showing, hide primary and show secondary palette
            console.log("Showing secondary")
            setPColorShow(false);
            setSColorShow(true);
            setColor(color);
        } else if (!pColorShow && sColorShow) {
            // if color chosen is from secondary palette change color of brush
            console.log("Selecting color")
            setSColorShow(false);
            setColor(color);
        }
    }

    /*
    Toggles the brush window (eg, show or don't show)
     */
    const toggleBrushWindow = () => {
        setBrushSizeShow(!brushSizeShow);
    }

    /*
    Changes brush size based off the given value
     */
    const changeBrushSize = (value) => {
        setBrushSize(value);
    }

    /*
    The primary color palette
     */
    const primaryColors = () => {
        const colors = ["red", "blue", "green", "brown", "black"];
        const colorComponents = colors.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                                  onPress={() => chooseColor(color)}/>)
        return(
            <View style={canvas.sideBar}>
                <>{colorComponents}</>
            </View>
        )
    }

    /*
    The secondary color palette is shown based on the given primary color
     */
    const secondaryColors = (color) => {
        const red = ["red", "sandybrown", "crimson", "gold"];
        const blue = ["steelblue", "blue", "paleturquoise"];
        const green = ["olivedrab", "lightgreen", "green"];
        const brown = ["tan", "saddlebrown", "bisque", "brown"];
        const black = ["black"];

        if (color === "red") {
            const colorComponents = red.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                                  onPress={() => chooseColor(color)}/>)
            return (
                <View style={canvas.sideBar}>
                    <>{colorComponents}</>
                </View>
            )
        } else if (color === "blue") {
            const colorComponents = blue.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                                  onPress={() => chooseColor(color)}/>)
            return (
                <View style={canvas.sideBar}>
                    <>{colorComponents}</>
                </View>
            )
        } else if (color === "green") {
            const colorComponents = green.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                                  onPress={() => chooseColor(color)}/>)
            return (
                <View style={canvas.sideBar}>
                    <>{colorComponents}</>
                </View>
            )
        } else if (color === "brown") {
            const colorComponents = brown.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                                  onPress={() => chooseColor(color)}/>)
            return (
                <View style={canvas.sideBar}>
                    <>{colorComponents}</>
                </View>
            )
        } else if (color === "black") {
            const colorComponents = black.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                                  onPress={() => chooseColor(color)}/>)
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
    const brushAdjuster = () => {
        return (
            <View style={canvas.sideBar}>
                <View style={{
                    borderRadius: brushMaxVal/2,
                    width: brushMaxVal,
                    height: brushMaxVal,
                    backgroundColor: "white",
                    position: "absolute",
                    // left: 5,
                    top: 10,
                    marginHorizontal: 5,

                }}>
                    <View style={{
                        borderRadius: brushSize/2,
                        width: brushSize,
                        height: brushSize,
                        backgroundColor: "black",
                        position: "absolute",
                        top: (brushMaxVal - brushSize) / 2,
                        right: (brushMaxVal - brushSize) / 2
                    }}/>
                </View>
                <Slider
                    style={{width: 300, height: 80, transform: [{rotate: "-90deg"}], top: 60 }}
                    minimumValue={0}
                    maximumValue={brushMaxVal}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    value={brushSize}
                    onValueChange={(newSize) => changeBrushSize(newSize)}
                    onSlidingComplete={() => toggleBrushWindow()}
                />
            </View>
        );
    }

    return (
        <View style={canvas.container}>
            <View style={{backgroundColor: '#fbf3dc', width: 100, height: 400,
                flexDirection: 'column', justifyContent: "space-around", alignItems: "center"}}>
                <TouchableOpacity
                    style={canvas.button}
                    onPress={() => chooseColor()}>
                    <Image
                        source={require("../assets/pencil.png")}
                        resizeMode="center"
                        style={canvas.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={canvas.button}
                    onPress={() => setColor("white")}>
                    <Image
                        source={require("../assets/rubber.png")}
                        resizeMode="center"
                        style={canvas.icon}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={canvas.button}
                    onPress={() => ref.current.undo()}>
                    <Image
                        source={require("../assets/undo.png")}
                        resizeMode="center"
                        style={canvas.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={canvas.button}
                    onPress={() => toggleBrushWindow()}>
                    <Image
                        source={require("../assets/top.png")}
                        resizeMode="center"
                        style={canvas.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={canvas.button}
                    onPress={() => {
                        ref.current.getBase64('jpg', false, false, false, false, (err, result) => {
                            setImage(result);
                        });
                        saveCanvas()
                    }}>
                    <Image
                        source={require("../assets/save.jpeg")}
                        resizeMode="center"
                        style={canvas.icon}
                    />
                </TouchableOpacity>
            </View>
            {pColorShow ? (primaryColors()) : null}
            {sColorShow ? (secondaryColors(color)) : null}
            {brushSizeShow ? (brushAdjuster()) : null}
            <View style={{flex: 1, flexDirection: 'column'}}>
                <SketchCanvas
                    ref={ref}
                    style={{flex: 1, backgroundColor: 'white'}}
                    strokeColor={color}
                    strokeWidth={brushSize}
                />
            </View>
        </View>
    );
}

AppRegistry.registerComponent('Draw', () => Draw);
