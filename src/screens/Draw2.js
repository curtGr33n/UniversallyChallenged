import React, {useRef, useState} from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import SignatureScreen, {readSignature} from 'react-native-signature-canvas';

const App = () => {
    const [signature, setSign] = useState(null);
    const [value, onChangeText] = useState('Useless Placeholder');
    const [desc, setDesc] = useState("please sign");

    const handleSignature = signature => {
        // console.log(signature);
        console.log("Handled signature in top lvl method")
        setSign(signature);
        setDesc("sign success");
    };

    const Sign = ({text, onOK}) => {
        const [ show, setShow ] = useState(false);
        const ref = useRef();
        const showSignature = () => setShow(true);
        const [background, setBackground] = useState("rgba(252,3,3,0.5)")

        const handleSignature = signature => {
            // console.log(signature);
            console.log("Handled Signature in Sign")
            onOK(signature);
            setShow(false);
        };

        const handleEmpty = () => {
            console.log('Empty');
        }

        const handleClear = () => {
            console.log('clear success!');
        }

        const handleEnd = () => {
            ref.current.readSignature();
            setBackground(signature)
        }

        const handleBegin = () => {
            console.log('begin!');
        };

        return (
            <View style={styles.container}>
                <SignatureScreen
                    ref={ref}
                    onEnd={handleEnd}
                    // onOK={handleSignature}
                    onEmpty={handleEmpty}
                    onClear={handleClear}
                    onBegin={handleBegin}
                    autoClear={false}
                    descriptionText={text}
                    backgroundColor={background}
                    penColor={"rgb(2,57,255)"}
                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, paddingTop: 40 }}>
            <View style={styles.preview}>
                {signature ? (
                    <Image
                        resizeMode={"contain"}
                        style={{ width: 750, height: 100 }}
                        source={{ uri: signature }}
                    />
                ) : null}
            </View>
            <Sign
                key="sign1"
                onOK={handleSignature}
                text={desc}
            />
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    preview: {
        height: 114,
        backgroundColor: "#F8F8F8",
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});