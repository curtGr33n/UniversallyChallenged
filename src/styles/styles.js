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
        fontWeight: '600',
        fontSize: 40,
        padding: 20,
        width: '100%',
        color:'black'
    },
    homeButtons: {
        display: "flex",
        flexDirection: 'row',
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    primary: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        height: 300,
        margin: 50,
        width: 300
    },
    imageLib: {
        width: '80%',
        height: '80%',
    },
    imageMedal: {
        width: '40%',
        height: '80%',
    },
    imageVideo: {
        width: '80%',
        height: '80%',
    },
    buzz: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        width: 200,
        height: 200, marginRight: 30, marginBottom: 30,
    }
})

const buttons = StyleSheet.create({
    primary: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: .5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5 ,
        margin: 5,
    },
    secondary: {
        height: 70,
        width: '100%',
        backgroundColor: '#fdda64',
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'black',
        fontWeight: "800",
        fontSize: 25,
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
export {styles, buttons, page}
