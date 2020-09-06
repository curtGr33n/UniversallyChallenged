import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    center: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 36,
        marginBottom: 16,
        color: 'orange'
    },
    view: {
        flex: 1,
        backgroundColor: "red"
    }
})

const buttons = StyleSheet.create({
    primary: {
        height: 70,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'black'
    }
})

// if a new stylesheet is created please export it here.
export {styles, buttons }
