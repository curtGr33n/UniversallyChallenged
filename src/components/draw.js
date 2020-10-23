import React, {Component, createRef} from 'react';
import {View, TouchableOpacity, Image, AppRegistry, TextInput, Text, Alert} from 'react-native';

import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

import {canvas} from '../styles/styles'
import Slider from "@react-native-community/slider";
import ViewShot, {captureRef} from "react-native-view-shot";


export default class Draw extends Component {
    constructor(props) {
        global.id = 4;
        super(props);
        this.myRef = createRef();
        this.brushMaxVal = 90;
        this.book = props.bookId;
        this.page = props.pageId;
        setTimeout(() => this.getRole(), 500);
        console.log("bookId: " + this.book + " pageId: " + this.page + " role: " + this.state.role + " user: " + global.id);
    }


    state = {
        colorShow: false,
        color: "black",
        brushSizeShow: false,
        brushSize: 10,
        image: null,
        role: "",
        text: "",
        textBoxShow: false,
        touch: true
    };

    getRole = async () => {
        console.log("get the role of the user");
        try {
            const url = 'https://deco3801-universally-challenged.uqcloud.net/getRole?';
            const query = "bookId=" + this.book + "&pageId=" + this.page + "&studentId=" + global.id;
            console.log(url + query);
            let response = await fetch(url + query);
            if (response.ok) {
                console.log("successful response");
                let role = await response.text();
                console.log("received role: " + role);
                this.setState({
                    role: role
                });
                console.log("role: " + this.state.role);
            } else {
                console.log("response not ok");
            }
        } catch (error) {
            console.error(error);
        }
    }

    saveCanvas = async () => {
        if (this.state.image != null) {
            console.log("saving image")
            console.log(this.state.image)
            try {
                const url = 'https://deco3801-universally-challenged.uqcloud.net/addImageToCreator';
                let response = await fetch(url, {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        bookId: this.book,
                        pageId: this.page,
                        studentId: global.id,
                        image: this.state.image
                    }).replace(/\\n/g, "")
                });
                if (response.ok) {
                    Alert.alert("Saved")
                    console.log("image sent to server successfully");
                } else {
                    console.log("response not received");
                }
            } catch (error) {
                console.error(error);
                console.log("caught error");
            }
        }
    };

    toggleColorPalette(color) {
        if (color !== null) {
            console.log("Changing pen color to " + color);
            this.setState({color: color})
        }
        console.log("toggleColorPalette");
        this.setState({
            colorShow: !this.state.colorShow,
            touch: !this.state.touch
        });
        console.log("colorShow: " + this.state.colorShow + " touch: " + this.state.touch);
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

    colorPalette () {
        const red = ["red", "sandybrown", "crimson", "gold"];
        const blue = ["steelblue", "blue", "paleturquoise"];
        const green = ["olivedrab", "lightgreen", "green"];
        const brown = ["tan", "saddlebrown", "bisque", "brown"];
        const black = ["black"];

        const redComponents= red.map(color =>
                <TouchableOpacity style={[canvas.button, {backgroundColor:color, paddingHorizontal: 10}]}
                                    onPress={() => this.toggleColorPalette(color)} />)
        const blueComponents= blue.map(color =>
            <TouchableOpacity style={[canvas.button, {backgroundColor:color, paddingHorizontal: 10}]}
                              onPress={() => this.toggleColorPalette(color)} />)
        const greenComponents= green.map(color =>
            <TouchableOpacity style={[canvas.button, {backgroundColor:color, paddingHorizontal: 10}]}
                              onPress={() => this.toggleColorPalette(color)} />)
        const brownComponents= brown.map(color =>
            <TouchableOpacity style={[canvas.button, {backgroundColor:color, paddingHorizontal: 10}]}
                              onPress={() => this.toggleColorPalette(color)} />)
        const blackComponents= black.map(color =>
            <TouchableOpacity style={[canvas.button, {backgroundColor:color, paddingHorizontal: 10}]}
                              onPress={() => this.toggleColorPalette(color)} />)
        return (
            // <View style={{flex: 1, backgroundColor: "black", position: "absolute", width: 1000, height: 1000, bottom: 1}}/>
            <View style={canvas.colorPalette}>
                <View style={{flexDirection: "row"}}>
                    <>{redComponents}</>
                </View>
                <View style={{flexDirection: "row"}}>
                    <>{blueComponents}</>
                </View>
                <View style={{flexDirection: "row"}}>
                    <>{greenComponents}</>
                </View>
                <View style={{flexDirection: "row"}}>
                    <>{brownComponents}</>
                </View>
                <View style={{flexDirection: "row"}}>
                    <>{blackComponents}</>
                </View>
            </View>
        );
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

    getCanvas() {
        if (this.state.role === "writer") {
            return (
                <View style={canvas.container}>
                    <View style={{backgroundColor: '#fbf3dc', width: 100, height: 400,
                        flexDirection: 'column', justifyContent: "space-around", alignItems: "center"}}>
                        <TouchableOpacity
                            style={canvas.button}
                            onPress={() => this.toggleTextBox()}>
                            <Image
                                source={require("../assets/images/text.png")}
                                resizeMode="center"
                                style={canvas.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={canvas.button}
                            onPress={() => captureRef(this.myRef, {
                                result: "base64"
                            }).then(uri => this.setState({image: uri})).then(
                                () => setTimeout(() => this.saveCanvas(), 100)
                            )}

                            >
                            <Image
                                source={require("../assets/save.jpeg")}
                                resizeMode="center"
                                style={canvas.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <ViewShot
                        ref={this.myRef}
                        style={{flex: 1, flexDirection: "column"}}>
                        <SketchCanvas
                            touchEnabled={false}
                            style={{flex: 1, backgroundColor: 'white'}}
                            text={[{text: this.state.text,
                                fontSize: 40,
                                position: { x: 0.5, y: 0.01 },
                                anchor: { x: 0.5, y: 0 },
                                coordinate: 'Ratio',
                                overlay: 'TextOnSketch',
                                fontColor: 'black',
                                imageType: 'jpg'
                            }]}
                        />
                        {this.state.textBoxShow ? (
                            <View style={{flexDirection: "row", height: 80, width: 200, position: "absolute", top: 50,
                                left: 50}}>
                                <TextInput
                                    style={{height: 40}}
                                    placeholder={"Type your story here"}
                                    onChangeText={(story) => this.setState({text: story})}
                                    defaultValue={""}
                                    editable={true}
                                    onSubmitEditing={() => this.toggleTextBox()}
                                    autoFocus={true}
                                />
                            </View>
                        ) : null}
                    </ViewShot>
                </View>
            )
        } else {
            console.log("got role background or illustrator");
            return (
                <View style={canvas.container}>
                    <View style={canvas.sideBar}>
                        <TouchableOpacity
                            style={canvas.button}
                            onPress={() => this.toggleColorPalette()}>
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
                                source={require("../assets/images/resizing.png")}
                                resizeMode="center"
                                style={canvas.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={canvas.button}
                            onPress={() => {
                                this.myRef.current.getBase64('jpg', false, false, false, false, (err, result) => {
                                    // console.log(result);
                                    this.setState({image: result});
                                })
                                setTimeout(() => this.saveCanvas(), 100);
                            }}>
                            <Image
                                source={require("../assets/save.jpeg")}
                                resizeMode="center"
                                style={canvas.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        {this.state.colorShow ? (this.colorPalette()) : null}
                        {this.state.brushSizeShow ? (this.brushAdjuster()) : null}
                        {/*<SketchCanvas*/}
                        {/*    ref={this.myRef}*/}
                        {/*    touchEnabled={this.state.touch}*/}
                        {/*    style={{flex: 1, backgroundColor: 'white'}}*/}
                        {/*    strokeColor={this.state.color}*/}
                        {/*    strokeWidth={this.state.brushSize}*/}
                        {/*/>*/}
                    </View>
                </View>
            );
        }
        // else {
        //     console.log("no role found");
        //     return (
        //         <View style={{flex: 1, backgroundColor: "white"}}/>
        //     )
        // }
    }

    toggleTextBox() {
        this.setState({textBoxShow: !this.state.textBoxShow})
    }

    render() {
        return (
            this.getCanvas()
        );
    }
}

AppRegistry.registerComponent('Draw', () => Draw);
