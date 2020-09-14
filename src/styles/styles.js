import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden'
    },
    title: {
        fontSize: 36,
        marginBottom: 16,
        color: 'orange'
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
    }
})

// if a new stylesheet is created please export it here.
export {styles, buttons }
