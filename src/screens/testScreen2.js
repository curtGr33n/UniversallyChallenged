import React, {Component, createRef, useEffect, useRef, useState, useCallback} from 'react';
import {View, Text, PixelRatio, TouchableOpacity, Image } from 'react-native';
import {captureRef, captureScreen} from "react-native-view-shot";

//This is how you import the style sheet
import { styles, colours } from '../styles/styles.js'

function TestScreen2 () {
    const catsSource = {
        uri: 'https://i.imgur.com/5EOyTDQ.jpg',
    };
    const testRef = useRef(null);
    const [previewSource, setPreviewSource] = useState(catsSource);
    const [result, setResult] = useState({ error: null, res: null });
    const [config, setConfig] = useState({
        format: 'png',
        quality: 0.9,
        result: 'tmpfile',
        snapshotContentContainer: false,
    });

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

    return (
        <View style={styles.container} ref={testRef}>
            <View
                style={styles.container}>
                <Image
                    style={styles.image}
                    source={previewSource}
                />
            </View>
            <TouchableOpacity
                style={[colours.button, colours.red]}
                onPress={() => setPreviewSource(require("../assets/complete.png"))}>
            </TouchableOpacity>
            <TouchableOpacity
                style={[colours.button, colours.blue]}
                onPress={() => setPreviewSource(require("../assets/bottom.png"))}>
            </TouchableOpacity>
            <TouchableOpacity
                style={[colours.button, colours.green]}
                onPress={() => capture(testRef)}>
            </TouchableOpacity>
        </View>
    );
}

export default TestScreen2;


