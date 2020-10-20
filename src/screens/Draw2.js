import React, {useRef, useState} from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity } from 'react-native';
import SignatureScreen, {readSignature} from 'react-native-signature-canvas';

const App = () => {
    const [signature, setSign] = useState(null);
    const [value, onChangeText] = useState('Useless Placeholder');
    const [desc, setDesc] = useState("please sign");
    const [pen, setPen] = useState("rgb(2,57,255)");

    const [ show, setShow ] = useState(false);
    const ref = useRef();
    const showSignature = () => setShow(true);
    const [background, setBackground] = useState("rgba(252,3,3,0.0)")

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

    const handleSignature = signature => {
        // ref.current.readSignature();
        console.log("Handled Signature in Sign")
        // console.log("\n" + signature + "\n");
        setSign(signature);
        // ref.current.readSignature();
        setShow(false);
    };

    const handleEmpty = () => {
        console.log('Empty');
    }

    const handleClear = () => {
        console.log('clear success!');
    }

    const handleEnd = () => {
        console.log("End Stroke")
        ref.current.readSignature();
        setSign(signature);
        console.log("\n" + signature + "\n");
    }

    const handleBegin = () => {
        console.log('Begin Stroke');
    };

    function changeColor (color) {
        setPen(color);
        setBackground(signature);
    }

    return (
        <View style={{ flex: 1, paddingTop: 40 }}>
            <View style={styles.preview}>
                {signature ? (
                    <Image
                        resizeMode={"contain"}
                        style={{ width: 750, height: 350 }}
                        source={{ uri: signature }}
                    />
                ) : null}
            </View>
            <View style={styles.container}>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={[styles.button, styles.red]}/>
                </View>
                <Image
                    source={{uri: signature}}
                    style={{width:600, height: 350, position: 'absolute',
                           right: 200}} />
                <SignatureScreen
                    ref={ref}
                    onEnd={handleEnd}
                    onOK={handleSignature}
                    onEmpty={handleEmpty}
                    onClear={handleClear}
                    onBegin={handleBegin}
                    autoClear={false}
                    descriptionText="Sign here"
                    backgroundColor={background}
                    penColor={pen}
                    webStyle={canvasStyle}
                />
            </View>
        </View>
    );
}
export default App;

const styles = StyleSheet.create({
    preview: {
        height: 114,
        backgroundColor: "rgba(252,3,3,0.0)",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        flex: 1,
    },
    previewText: {
        color: "#FFF",
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#69B2FF",
        width: 120,
        textAlign: "center",
        marginTop: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 110,
        width: 110,
        marginHorizontal: 20,
        marginVertical: 20
    },
    red: {
        backgroundColor: '#fc0703'
    },
    blue: {
        backgroundColor: '#0422e0'
    }
});