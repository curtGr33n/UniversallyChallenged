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
        color: 'white',
        fontWeight: "600",
        fontSize: 25
    }
})

// if a new stylesheet is created please export it here.
export {styles, buttons }
