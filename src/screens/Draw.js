import React, {useState, useRef, useEffect, useCallback} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import SignatureScreen, {readSignature} from 'react-native-signature-canvas';

import { styles, colours } from '../styles/styles.js';

function Draw () {
    const canvasRef = useRef(null);
    const canvasStyle = `
                        .m-signature-pad {
                        width: 600px;
                        height: 350px;
                        margin-left: 0px;
                        margin-top: 0px;
                        background-color: transparent
                        }
                        // .m-signature-pad--footer {
                        //     display: none
                        // }
                        .m-signature-pad--body {
                            left: 0px;
                            right: 0px;
                            top: 0px;
                            bottom: 0px;
                            border: 0px solid #f4f4f4;
                        }
                        .m-signature-pad--body
                            canvas {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            border-radius: 0px;
                            box-shadow: 0 0 0px rgba(0, 0, 0, 0.02) inset;
                            }
                        `;
    // Signature variables
    const [signature, setSignature] = useState(null);
    const [colour, setColour] = useState('#000000');
    const [background, setBackground] = useState("rgba(252,3,3,0.0)");

    const handleSignature = signature => {
        // ref.current.readSignature();
        console.log("Handled Signature in Sign")
        // console.log("\n" + signature + "\n");
        setSignature(signature);
        // ref.current.readSignature();
    };

    const handleEmpty = () => {
        console.log('Empty');
    }

    const handleClear = () => {
        console.log('clear success!');
    }

    const handleEnd = () => {
        console.log("End Stroke")
        canvasRef.current.readSignature();
        setSignature(signature);
        console.log("\n" + signature + "\n");
    }

    const handleBegin = () => {
        console.log('Begin Stroke');
    };

    const [canvas, setCanvas] = useState(
        <SignatureScreen
            ref={canvasRef}
            onEnd={handleEnd}
            onOK={handleSignature}
            onEmpty={handleEmpty}
            onClear={handleClear}
            onBegin={handleBegin}
            webStyle={canvasStyle}
            descriptionText="Sign"
            clearText="Clear"
            confirmText="Save"
            penColor = { colour }
            backgroundColor = { background }
        />
    );

    function Canvas() {
        return canvas;
    }


    // when the colour is changed
    // 1. Save current image of drawing
    // 2. Render Signature with the saved image as the background
    //    with the chosen colour
    const prevColourRef = useRef();
    const prevColour = prevColourRef.current;
    useEffect(() => {
        prevColourRef.current = colour;
        console.log("previous colour: " + prevColour + " current colour: " + colour);
        console.log("Signature: " + signature);
        setCanvas(
            <SignatureScreen
                ref={canvasRef}
                onEnd={handleEnd}
                onOK={handleSignature}
                onEmpty={handleEmpty}
                onClear={handleClear}
                onBegin={handleBegin}
                webStyle={canvasStyle}
                descriptionText="Sign"
                clearText="Clear"
                confirmText="Save"
                penColor = { colour }
                backgroundColor = { background }
            />
        );
    }, [colour]);

    return (
        <View style={colours.screen}>
            <View style={colours.colourBar}>
                <TouchableOpacity
                    style={[colours.button, colours.red]}
                    onPress={() => setColour('#fc0703')}>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[colours.button, colours.blue]}
                    onPress={() => setColour('#0422e0')}>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[colours.button, colours.green]}
                    onPress={() => setColour('#1a8000')}>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[colours.button, colours.pink]}
                    onPress={() => setColour('#d103ff')}>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[colours.button, colours.yellow]}
                    onPress={() => setColour('#f3cd3c')}>
                </TouchableOpacity>
            </View>
            <View style={colours.screenOnTop}>
                <Image
                    style={styles.image}
                    source={{uri: signature}}
                />
                <View
                    style={colours.sketch}>
                    <View style={colours.sketch}>
                        <Canvas/>
                    </View>
                </View>
            </View>

        </View>
    );
}

export default Draw;
