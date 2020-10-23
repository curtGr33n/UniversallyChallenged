import React, {Component, createRef} from 'react';
import {View, TouchableOpacity, Image, AppRegistry, TextInput, Text, Alert} from 'react-native';

import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

import {canvas} from '../styles/styles'
import Slider from "@react-native-community/slider";
import ViewShot, {captureRef} from "react-native-view-shot";


export default class Draw extends Component {
    constructor(props) {
        global.id = 5;
        super(props);
        this.myRef = createRef();
        this.brushMaxVal = 90;
        this.book = props.bookId;
        this.page = props.pageId;
        setTimeout(() => this.getRole(), 500);
        console.log("bookId: " + this.book + " pageId: " + this.page + " role: " + this.state.role + " user: " + global.id);
    }


    state = {
        pColorShow: false,
        sColorShow: false,
        color: "red",
        brushSizeShow: false,
        brushSize: 10,
        image: null,
        role: "",
        text: "",
        textBoxShow: false,
        textAlignment: "Center",
        optionIndex: 0
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

    getTextAlignment() {
        const alignOptions = ['Left', 'Center', 'Right']
        this.setState({optionIndex: this.state.optionIndex + 1});
        let align = alignOptions[this.state.optionIndex % 3];
        this.setState({textAlignment: align});
        console.log("alignment: " + this.state.textAlignment + " with " + this.state.optionIndex);
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
                            <Text style={{fontSize: 20}}>Add Text</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={canvas.button}
                            onPress={() => this.getTextAlignment()}>
                            <Text style={{fontSize: 20}}>Alignment</Text>
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
                                alignment: this.state.textAlignment,
                                imageType: 'jpg',
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
            return (
                <View style={canvas.container}>
                    <View style={canvas.sideBarOverlay}>
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
