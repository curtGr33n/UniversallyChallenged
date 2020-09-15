import React, {useState, useRef, useEffect, useCallback} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import SignatureScreen, {readSignature} from 'react-native-signature-canvas';
import {captureRef, captureScreen} from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';

//This is how you import the style sheet
import { styles, colours } from '../styles/styles.js';

function Draw () {
    // Saved image variables
    const catsSource = {
        uri: 'https://i.imgur.com/5EOyTDQ.jpg',
    };
    const canvasRef = useRef(null);

    const handleEnd = () => {
        canvasRef.current.readSignature();
    }

    const [previewSource, setPreviewSource] = useState(catsSource);
    const [result, setResult] = useState({ error: null, res: null });
    const [config, setConfig] = useState({
        format: 'png',
        quality: 0.9,
        result: 'tmpfile',
        snapshotContentContainer: false,
    });
    // Signature variables
    const [signature, setSignature] = useState(null);
    const [colour, setColour] = useState('#000000');
    const [background, setBackground] = useState('#fff');

    const handleSignature = signature => {
        console.log(signature);
        setSignature(signature)
        const path = FileSystem.cacheDirectory + 'sign.png';
        // FileSystem.writeAsStringAsync(path, signature.replace('data:image/png;base64,', ''),
        //     {encoding: FileSystem.EncodingType.Base64}).then(res => {
        //     console.log(res);
        //     FileSystem.getInfoAsync(path, {size: true, md5: true}).then(file => {
        //         console.log(file);
        //     })
        // }).catch(err => {
        //     console.log("err", err);
        // })
    };

    const [canvas, setCanvas] = useState(
        <SignatureScreen
            ref={canvasRef}
            // onOK={(img) => setSignature(img)}
            descriptionText="Sign"
            clearText="Clear"
            confirmText="Save"
            penColor = { colour }
            backgroundColor = { background }
            // onOk={handleSignature(signature)}
            onOK={() => console.log(signature)}
            // onEnd={handleEnd}
        />
    );

    function Canvas() {
        return canvas;
    }

    const onCapture = useCallback(
        res => {
            if (config.result === 'base64') {
                const b = Buffer.from(res, 'base64');
                console.log('buffer of length ' + b.length);
            }
            setPreviewSource({
                uri: config.result === 'base64' ? 'data:image/' + config.format + ';base64,' + res : res,
            });
            setResult({
                error: null,
                res,
            });
        },
        [config],
    );

    const onCaptureFailure = useCallback(error => {
        console.warn(error);
        setPreviewSource(null);
        setResult({
            error,
            res: null,
        });
    }, []);

    const capture = useCallback(
        ref => {
            (ref ? captureRef(ref, config) : captureScreen(config))
                .then(res =>
                    config.result !== 'tmpfile'
                        ? res
                        : new Promise((success, failure) =>
                            // just a test to ensure res can be used in Image.getSize
                            Image.getSize(res, (width, height) => success(res), failure),
                        ),
                )
                .then(onCapture, onCaptureFailure);
        },
        [config, onCapture, onCaptureFailure],
    );

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
                // onOK={(img) => setSignature(img)}
                descriptionText="Sign"
                clearText="Clear"
                confirmText="Save"
                penColor = { colour }
                // onOK={handleSignature(signature)}
                onOK={() => console.log(signature)}
                // onEnd={handleEnd}
            />
        );
    }, [colour]);

    return (
        <View style={colours.screen}>
            <View style={colours.colourBar}>
                <TouchableOpacity
                    style={[colours.button, colours.red]}
                    // onPress={() => setColour('#fc0703')}>
                    onPress={() => capture(canvasRef)}>
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
            <View
                style={colours.screenOnTop}
                ref={canvasRef}>
                <Image
                    style={styles.image}
                    // source={previewSource}
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
