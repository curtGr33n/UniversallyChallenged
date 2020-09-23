import {StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden'
    },
    title: {
        fontSize: 36,
        marginBottom: 16,
        //color: 'orange'
    },
    logo:{
        width: 287,
        height: 250,
        position: "absolute",
        top: 150,
    },
    logoText:{
        width: 400,
        height: 50,
        position: "absolute",
        top: 420,
    },
    storyTitleText: {
        textAlign: 'center',
        padding: 20,
        color: '#333333',
        fontWeight: "600",
        fontSize: 30,
    }
})

const page = StyleSheet.create({
    title: {
        backgroundColor: '#f8ebc4',
        alignItems: 'center',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 40,
        padding: 20
    }
})

const buttons = StyleSheet.create({
    primary: {
        height: 70,
        width: '100%',
        backgroundColor: '#bc904f',
    },
    secondary: {
        height: 70,
        width: '100%',
        backgroundColor: '#fdda64',
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: '#fbf3dc',
        fontWeight: "600",
        fontSize: 25
    },
    buttonPages: {
        backgroundColor: "#bb904f",
        textAlign: 'center',
        justifyContent: "space-between",
        alignItems: "flex-start",
        color: '#fbf3dc',
        padding: 30,
        paddingBottom: 30
    },
    smallButton: {
        height: 30,
        width: 30,
        backgroundColor: '#bc904f'
    },
    largeButton: {
        height: 100,
        width: 100,
        backgroundColor: 'rgba(143, 0, 0, 0.5)',
        // position: 'absolute',
        // left: 100,
        // top: 300,
        // margin: 20

    }
})

const canvas= StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    strokeColorButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 5,
    },
    strokeWidthButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#39579A',
    },
    functionButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        height: 30,
        width: 60,
        backgroundColor: '#39579A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    button: {
        width: 65,
        height: 65,
        backgroundColor: "white"
    },
    colourPalette: {
        position: "absolute",
        top: 44.5,
        left: 0,
        height: 400,
        width:  100,
        borderRadius: 5,
        backgroundColor: '#fbf3dc',
        flexDirection: 'column',
        justifyContent: "space-around",
        alignItems: "center"
    },
    red: {
        backgroundColor: '#8f0000'
    },
    yellow: {
        backgroundColor: '#ffc30a'
    },
    green: {
        backgroundColor: '#0eb891'
    },
    brown: {
        backgroundColor: '#4a35ff'
    },
    black: {
        backgroundColor: '#051032'
    },
    icon: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 7,
        top: 7
    }
})

// if a new stylesheet is created please export it here.
export {styles, buttons, page, canvas}
