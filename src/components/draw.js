import React, {Component, createRef, useEffect} from 'react';
import {View, TouchableOpacity, Image, AppRegistry, TextInput, Text, Alert, ScrollView} from 'react-native';

import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

import {canvas} from '../styles/styles'
import Slider from "@react-native-community/slider";
import ViewShot, {captureRef} from "react-native-view-shot";

export default class Draw extends Component {
    constructor(props) {
        super(props);
        global.id = 1;
        this.myRef = createRef();       // reference used to capture the component to be sent to be saved
        this.textRef = createRef();     // reference used to save image of text canvas as it would appear in the
        this.page = props.page;         // final merged image
        this.brushMaxVal = 90;
        this.role = this.getRole(props);
        this.book = props.bookId;
        this.pageId = this.page.pagenum;
        // console.log("bookId: " + this.book + " pageId: " + this.pageId + " role: " + this.role + " user: " + global.id);
    }

    state = {
        colorShow: false,
        color: "black",
        brushSizeShow: false,
        brushSize: 10,
        image: null,
        role: "",
        prevText: "",
        text: "This is where text will go...",
        line: 1,
        textBoxShow: false,
        touch: true,
        initial: true
    };

    /**
     * Gets the role of the users based on the current global.id (id of the user)
     * @param props properties passed into Draw
     * @returns the role of the user for the page or invalid if the user has not been assigned
     */
    getRole (props) {
        for (let cr = 0; cr < props.page.creators.length; cr++) {
            if (props.page.creators[cr].studentId === global.id) {
                return props.page.creators[cr].role;
            }
        }
        return "invalid";
    }

    /**
     * Saves the base64 canvas image to the server with the current bookId, pageId and userId
     */
    saveCanvas = async () => {
        if (this.state.image != null) {
            // console.log("saving image")
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
                        pageId: this.pageId,
                        studentId: global.id,
                        image: this.state.image
                    }).replace(/\\n/g, "")
                });
                if (response.ok) {
                    Alert.alert("Saved")
                    // console.log("image sent to server successfully");
                } else {
                    Alert.alert("Something not ok");
                    // console.log("Not successful");
                }
            } catch (error) {
                Alert.alert("Not saved")
                console.error(error);
                // console.log("caught error");
            }
        }
    };

    /**
     Changes colors of the brush and shows the colour palette
     */
    chooseColor (color) {
        if (color != null) {
            this.setState({
                colorShow: false,
                color: color,
                touch: true
            })
        } else {
            this.setState({
                colorShow: true,
                touch: false
            })
        }
    }

    /**
     The displayed color palette
     */
    colorPalette () {
        const colors1 = ["gold", "sandybrown", "crimson", "lightpink", "mediumpurple", "lightgreen", "olivedrab",
            "paleturquoise", "steelblue", "tan", "saddlebrown", "bisque", "black"];
        const colorRow1 = colors1.map(color =>
            <TouchableOpacity style={[canvas.colorButton, {backgroundColor: color}]}
                              onPress={() => this.chooseColor(color)}/>)
        return(
            <View style={[canvas.sideBarOverlay, {height: 515}]}>
                <ScrollView style={{flex: 1}}>
                    <>{colorRow1}</>
                </ScrollView>
            </View>

        )
    }

    /**
     Toggles the brush window (eg, show or don't show)
     */
    toggleBrushWindow () {
        this.setState({
            brushSizeShow: !this.state.brushSizeShow
        });
    }

    /**
     Changes brush size based off the given value
     */
    changeBrushSize (value) {
        this.setState({
            brushSize: value
        });
    }

    /**
     * Gets the index of the creator in the array of creators
     * @returns The index where the role of the user is located
     */
    getCreatorIndex() {
        let creators = this.page.creators;
        for (let cr = 0; cr < creators.length; cr++) {
            if (creators[cr].studentId === global.id) {
                return cr;
            }
        }
        return -1;
    }

    /**
     View that shows the brush adjuster
     */
    brushAdjuster () {
        return (
            <View style={canvas.sideBarOverlay}>
                <View style={{
                    borderRadius: this.brushMaxVal/2,
                    width: this.brushMaxVal,
                    height: this.brushMaxVal,
                    backgroundColor: "white",
                    position: "absolute",
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

    /**
     * Toggles whether to show/noShow the text box
     */
    toggleTextBox() {
        if (this.state.initial) {
            this.setState({
                initial: false,
                text: ""
            })
        }
        this.setState({textBoxShow: !this.state.textBoxShow})
    }

    /**
     * Gets the canvas layout based on the users role on the page
     */
    getCanvas() {
        if (this.role === "writer") {
            return (
                <View style={canvas.container}>
                    <View style={canvas.textSideBar}>
                        <TouchableOpacity
                            style={canvas.button}
                            onPress={() => this.toggleTextBox()}>
                            {!this.state.textBoxShow ? (
                                <Image
                                    source={require("../assets/images/text.png")}
                                    resizeMode="center"
                                    style={canvas.icon}
                                />
                            ) : (
                                <Image
                                    source={require("../assets/images/tick.png")}
                                    resizeMode="center"
                                    style={canvas.icon}
                                />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={canvas.button}
                            onPress={() => captureRef(this.myRef, {
                                result: "base64"
                            }).then(uri => this.setState({image: uri})).then(
                                () => {
                                    // send canvas to database (this like a crop of the canvas)
                                    setTimeout(() => this.saveCanvas(), 100);
                                    // then save what the canvas would look like to creator.canvas locally to be
                                    // displayed
                                    captureRef(this.textRef, {
                                        result: "base64"
                                    }).then(result => {
                                        let cr = this.getCreatorIndex();
                                        if (cr > 0) {
                                            this.page.creators[cr].canvas = result;
                                        }
                                    })
                                }
                            )}
                        >
                            <Image
                                source={require("../assets/images/save.jpeg")}
                                resizeMode="center"
                                style={canvas.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    {/*TextBox component*/}
                    <ViewShot
                        ref={this.textRef}
                        style={{flex: 1, backgroundColor: "white", alignContent: "center", alignSelf: "flex-start"}}>
                        <ViewShot
                            ref={this.myRef}
                            style={{height: 80, flexDirection: "column", alignContent: "flex-start"}}>
                            <View style={{flex: 1, alignItems: "center"}}>
                                <Text
                                    style={canvas.text}
                                    adjustsFontSizeToFit={true}

                                >{this.state.text}</Text>
                            </View>
                        </ViewShot>
                        <View style={{flexGrow: 8, backgroundColor: "transparent"}}/>
                    </ViewShot>
                    {/*Hidden TextBox Component*/}
                    {this.state.textBoxShow ? (
                        <View style={{flexDirection: "row", height: 80, width: 200, position: "absolute", elevation: -2}}>
                            <TextInput
                                style={canvas.text}
                                placeholder={"Type your story here"}
                                onChangeText={(story) => this.setState({text: story})}
                                defaultValue={""}
                                editable={true}
                                onSubmitEditing={() => this.toggleTextBox()}
                                autoFocus={true}
                                autoCapitalize={"sentences"}
                                multiline={true}
                                value={this.state.text}
                            >
                            </TextInput>
                        </View>
                        ) : null}
                </View>
            )
        } else if (this.role === "illustrator" || this.role === "background") {
            return (
                <View style={canvas.container}>
                    <View style={canvas.sideBar}>
                        <TouchableOpacity
                            style={[canvas.button, {backgroundColor: this.state.color}]}
                            onPress={() => this.chooseColor()}>
                            <Image
                                source={require("../assets/images/pencil-Invert.png")}
                                resizeMode="center"
                                style={canvas.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={canvas.button}
                            onPress={() => this.setState({color: "white"})}>
                            <Image
                                source={require("../assets/images/rubber.png")}
                                resizeMode="center"
                                style={canvas.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={canvas.button}
                            onPress={() => this.myRef.current.undo()}>
                            <Image
                                source={require("../assets/images/undo.png")}
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
                                this.setState({text: ""});
                                this.myRef.current.getBase64('png', true, false, false, false, (err, result) => {
                                    this.setState({image: result});
                                    let cr = this.getCreatorIndex();
                                    console.log("cr is" + cr);
                                    if (cr > 0) {
                                        this.page.creators[cr].canvas = result;
                                    }
                                })
                                setTimeout(() => this.saveCanvas(), 100);
                                this.setState({text: "This is where text will go..."})
                            }}>
                            <Image
                                source={require("../assets/images/save.jpeg")}
                                resizeMode="center"
                                style={canvas.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    {this.state.colorShow ? (this.colorPalette()) : null}
                    {this.state.brushSizeShow ? (this.brushAdjuster()) : null}
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <SketchCanvas
                            ref={this.myRef}
                            style={{flex: 1}}
                            strokeColor={this.state.color}
                            strokeWidth={this.state.brushSize}
                            touchEnabled={this.state.touch}
                            text={[{
                                text: this.state.text,
                                fontSize: 60,
                                position: { x: 0.5, y: 0.01 },
                                anchor: { x: 0.5, y: 0 },
                                coordinate: 'Ratio',
                                overlay: 'TextOnSketch',
                                fontColor: 'black',
                                font: 'fonts/typewriter-Bold.ttf',
                                imageType: 'png',
                                alignment: 'Center'
                            }]}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1, backgroundColor: "white", justifyContent: "center", alignContent: "center"}}>
                    <Text style={{fontSize: 30}}>Not a valid role: {this.role}</Text>
                </View>
            )
        }
    }

    render() {
        return (
            this.getCanvas()
        );
    }
}

AppRegistry.registerComponent('Draw', () => Draw);
