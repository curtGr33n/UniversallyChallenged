import React, {Component, createRef} from 'react';
import {View, TouchableOpacity, Image, AppRegistry, TextInput, Text, Alert} from 'react-native';

import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

import {canvas} from '../styles/styles'
import Slider from "@react-native-community/slider";
import ViewShot, {captureRef} from "react-native-view-shot";


export default class Draw extends Component {
    constructor(props) {
        super(props);
        this.myRef = createRef();
        this.brushMaxVal = 90;
        this.book = props.bookId;
        this.page = props.pageId;
        setTimeout(() => this.getRole(), 500);
        console.log("bookId: " + this.book + " pageId: " + this.page + " role: " + this.state.role + " user: " + global.id);
        console.log("Page number (Draw) = " + props.page.pagenum)
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

    /**
     * Gets the role of the user. Role can be either illustrator/background/writer
     */
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
                console.log(role)
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

    /**
     * Saves the base64 canvas image to the server with the current bookId, pageId and userId
     */
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
     The primary color palette
     */
    primaryColors () {
        const colors = ["red", "blue", "green", "brown", "black"];
        const colorComponents = colors.map(color =>
            <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
                              onPress={() => this.chooseColor(color)}/>)
        return(
            <View style={canvas.sideBarOverlay}>
                <>{colorComponents}</>
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

    /**
     * Toggles whether to show/noShow the text box
     */
    toggleTextBox() {
        this.setState({textBoxShow: !this.state.textBoxShow})
    }

    /**
     * Gets the canvas layout based on the users role on the page
     */
    getCanvas() {
        if (this.state.role === "writer") {
            return (
                <View style={canvas.container}>
                    <View style={canvas.textSideBar}>
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
                    </ViewShot>
                </View>
            )
        } else if (this.state.role === "illustrator" || this.state.role === "background") {
            return (
                <View style={canvas.container}>
                    <View style={canvas.sideBar}>
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
                    {this.state.colorShow ? (this.primaryColors()) : null}
                    {this.state.brushSizeShow ? (this.brushAdjuster()) : null}
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <SketchCanvas
                            ref={this.myRef}
                            style={{flex: 1, backgroundColor: 'white'}}
                            strokeColor={this.state.color}
                            strokeWidth={this.state.brushSize}
                            touchEnabled={this.state.touch}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1, backgroundColor: "white"}}/>
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
