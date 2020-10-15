import React, {Component, createRef, useState} from 'react';
import {View, TouchableOpacity, Image, AppRegistry, Text} from 'react-native';

import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

import {canvas} from '../styles/styles'
import Slider from "@react-native-community/slider";

// export function Draw (props) {
//     const brushMaxVal = 90;
//     const [ref, setRef] = useState(null);
//     const [image, setImage] = useState(null);
//     const [pColorShow, setPColorShow] = useState(false);
//     const [sColorShow, setSColorShow] = useState(false);
//     const [color, setColor] = useState("red");
//     const [brushSizeShow, setBrushSizeShow] = useState(false);
//     const [brushSize, setBrushSize] = useState(10);
//     const bookId = props.bookdId;
//     const pageId = props.pageId;
//     console.log("bookId: " + bookId + " pageId: " + pageId + " studentId: " + global.id);
//
//     const saveCanvas = async () => {
//         if (image != null) {
//             try {
//                 const url = 'https://deco3801-universally-challenged.uqcloud.net/addImageToCreator';
//                 let response = await fetch(url, {
//                     method: "POST",
//                     headers: {
//                         Accept: 'application/json',
//                         'Content-Type': 'application/json'
//                     },
//                     // body: JSON.stringify({
//                     //         bookId: 11,
//                     //         pageId: 0,
//                     //         studentId: 3,
//                     //         image: image
//                     //     }).replace(/\\n/g, "")
//                     body: JSON.stringify({
//                                 bookId: props.bookId,
//                                 pageId: props.pageId,
//                                 studentId: global.id,
//                                 image: image
//                             }).replace(/\\n/g, "")
//                 });
//                 if (response.ok) {
//                     console.log("base64 sent to server successfully");
//                 } else {
//                     console.log("response not received");
//                 }
//             } catch (error) {
//                 console.error(error);
//                 console.log("caught error");
//
//             }
//         }
//     };
//
//     /*
//     Changes colors of the brush and shows the primary/secondary palette based on what screen is show
//      */
//     const chooseColor = (color) => {
//         if (!pColorShow && !sColorShow) {
//             // if no color palettes are showing, show primary palette
//             console.log("Showing primary")
//             setPColorShow(true);
//         } else if (pColorShow && !sColorShow) {
//             // if primary palette is already showing, hide primary and show secondary palette
//             console.log("Showing secondary")
//             setPColorShow(false);
//             setSColorShow(true);
//             setColor(color);
//         } else if (!pColorShow && sColorShow) {
//             // if color chosen is from secondary palette change color of brush
//             console.log("Selecting color")
//             setSColorShow(false);
//             setColor(color);
//         }
//     }
//
//     /*
//     Toggles the brush window (eg, show or don't show)
//      */
//     const toggleBrushWindow = () => {
//         setBrushSizeShow(!brushSizeShow);
//     }
//
//     /*
//     Changes brush size based off the given value
//      */
//     const changeBrushSize = (value) => {
//         setBrushSize(value);
//     }
//
//     /*
//     The primary color palette
//      */
//     const primaryColors = () => {
//         const colors = ["red", "blue", "green", "brown", "black"];
//         const colorComponents = colors.map(color =>
//                 <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
//                                   onPress={() => chooseColor(color)}/>)
//         return(
//             <View style={canvas.sideBar}>
//                 <>{colorComponents}</>
//             </View>
//         )
//     }
//
//     /*
//     The secondary color palette is shown based on the given primary color
//      */
//     const secondaryColors = (color) => {
//         const red = ["red", "sandybrown", "crimson", "gold"];
//         const blue = ["steelblue", "blue", "paleturquoise"];
//         const green = ["olivedrab", "lightgreen", "green"];
//         const brown = ["tan", "saddlebrown", "bisque", "brown"];
//         const black = ["black"];
//
//         if (color === "red") {
//             const colorComponents = red.map(color =>
//                 <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
//                                   onPress={() => chooseColor(color)}/>)
//             return (
//                 <View style={canvas.sideBar}>
//                     <>{colorComponents}</>
//                 </View>
//             )
//         } else if (color === "blue") {
//             const colorComponents = blue.map(color =>
//                 <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
//                                   onPress={() => chooseColor(color)}/>)
//             return (
//                 <View style={canvas.sideBar}>
//                     <>{colorComponents}</>
//                 </View>
//             )
//         } else if (color === "green") {
//             const colorComponents = green.map(color =>
//                 <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
//                                   onPress={() => chooseColor(color)}/>)
//             return (
//                 <View style={canvas.sideBar}>
//                     <>{colorComponents}</>
//                 </View>
//             )
//         } else if (color === "brown") {
//             const colorComponents = brown.map(color =>
//                 <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
//                                   onPress={() => chooseColor(color)}/>)
//             return (
//                 <View style={canvas.sideBar}>
//                     <>{colorComponents}</>
//                 </View>
//             )
//         } else if (color === "black") {
//             const colorComponents = black.map(color =>
//                 <TouchableOpacity style={[canvas.button, {backgroundColor: color}]}
//                                   onPress={() => chooseColor(color)}/>)
//             return (
//                 <View style={canvas.sideBar}>
//                     <>{colorComponents}</>
//                 </View>
//             )
//         }
//     }
//
//     /*
//     View that shows the brush adjuster
//      */
//     const brushAdjuster = () => {
//         return (
//             <View style={canvas.sideBar}>
//                 <View style={{
//                     borderRadius: brushMaxVal/2,
//                     width: brushMaxVal,
//                     height: brushMaxVal,
//                     backgroundColor: "white",
//                     position: "absolute",
//                     // left: 5,
//                     top: 10,
//                     marginHorizontal: 5,
//
//                 }}>
//                     <View style={{
//                         borderRadius: brushSize/2,
//                         width: brushSize,
//                         height: brushSize,
//                         backgroundColor: "black",
//                         position: "absolute",
//                         top: (brushMaxVal - brushSize) / 2,
//                         right: (brushMaxVal - brushSize) / 2
//                     }}/>
//                 </View>
//                 <Slider
//                     style={{width: 300, height: 80, transform: [{rotate: "-90deg"}], top: 60 }}
//                     minimumValue={0}
//                     maximumValue={brushMaxVal}
//                     minimumTrackTintColor="#FFFFFF"
//                     maximumTrackTintColor="#000000"
//                     value={brushSize}
//                     onValueChange={(newSize) => changeBrushSize(newSize)}
//                     onSlidingComplete={() => toggleBrushWindow()}
//                 />
//             </View>
//         );
//     }
//
//     return (
//         <View style={canvas.container}>
//             <View style={{backgroundColor: '#fbf3dc', width: 100, height: 400,
//                 flexDirection: 'column', justifyContent: "space-around", alignItems: "center"}}>
//                 <TouchableOpacity
//                     style={canvas.button}
//                     onPress={() => chooseColor()}>
//                     <Image
//                         source={require("../assets/pencil.png")}
//                         resizeMode="center"
//                         style={canvas.icon}
//                     />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={canvas.button}
//                     onPress={() => setColor("white")}>
//                     <Image
//                         source={require("../assets/rubber.png")}
//                         resizeMode="center"
//                         style={canvas.icon}
//                     />
//                 </TouchableOpacity>
//
//                 <TouchableOpacity
//                     style={canvas.button}
//                     onPress={() => ref.current.undo()}>
//                     <Image
//                         source={require("../assets/undo.png")}
//                         resizeMode="center"
//                         style={canvas.icon}
//                     />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={canvas.button}
//                     onPress={() => toggleBrushWindow()}>
//                     <Image
//                         source={require("../assets/top.png")}
//                         resizeMode="center"
//                         style={canvas.icon}
//                     />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={canvas.button}
//                     onPress={() => {
//                         ref.getBase64('jpg', false, false, false, false, (err, result) => {
//                             setImage(result);
//                         });
//                         saveCanvas()
//                     }}>
//                     <Image
//                         source={require("../assets/save.jpeg")}
//                         resizeMode="center"
//                         style={canvas.icon}
//                     />
//                 </TouchableOpacity>
//             </View>
//             {pColorShow ? (primaryColors()) : null}
//             {sColorShow ? (secondaryColors(color)) : null}
//             {brushSizeShow ? (brushAdjuster()) : null}
//             <View style={{flex: 1, flexDirection: 'column'}}>
//                 <SketchCanvas
//                     ref={ref}
//                     style={{flex: 1, backgroundColor: 'white'}}
//                     strokeColor={color}
//                     strokeWidth={brushSize}
//                 />
//             </View>
//         </View>
//     );
// }

export default class Draw extends Component {
    constructor(props) {
        super(props);
        this.myRef = createRef();
        this.brushMaxVal = 90;
        this.setState({image: null});
        this.book = props.bookId;
        this.page = props.pageId;
        this.role = "";
        //this.getRole();
        console.log("StudentId: " + global.id + " BookId: " + this.book + " PageId: " + this.page + " Role: " + this.role);
    }

    state = {
        pColorShow: false,
        sColorShow: false,
        color: "red",
        brushSizeShow: false,
        brushSize: 10,
        image: null
    };

    getRole = async () => {
        console.log("get the role of the user");
        try {
            const url = 'https://deco3801-universally-challenged.uqcloud.net/getRole?';
            const query = "bookid=" + this.book + "&pageId=" + this.page + "&studentId=" + global.user;
            let response = await fetch(url + query);
            if (response.ok) {
                this.role = response.text();
            }
        } catch (error) {
            console.error(error);
        }
    }

    saveCanvas = async () => {

        if (this.state.image != null) {
            console.log("saving image")
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

AppRegistry.registerComponent('Draw', () => Draw);
