import {StyleSheet} from "react-native";

/**
 * Main layout styling
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden'
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    }
})

/**
 * Page styling
 */
const page = StyleSheet.create({
    title: {
        backgroundColor: '#f8ebc4',
        alignItems: 'center',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 40,
        padding: 20,
        width: '100%',
        color:'black',
        fontFamily: 'Typewriter2-Bold',
        lineHeight: 30
    },
    homeButtons: {
        display: "flex",
        flexDirection: 'row',
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 50,
        paddingRight: 50
    },
    primary: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        height: 300,
        margin: 50,
        width: 300
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    splash: {
        width: '60%',
        height: undefined,
        justifyContent: 'center',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    buzz: {
        alignSelf: 'flex-end',
        width: '15%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
        marginRight: 5,
        marginBottom: 5,
        marginTop: 50,
    },
    offsetData: {
       marginBottom: '20%'
    },
    dropDown: {
        width: '20%',
        height: 60,
        backgroundColor: '#f8ebc4',
        borderRadius: 30,
        padding: 20,
        fontSize: 30,
        color: 'black',
        fontFamily: 'typewriter-Bold',
        justifyContent: 'center',
    },
    bookImage: {
        width: '100%',
        height: '100%',
        alignItems:"center",
        justifyContent:"center",
    },
    bookText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
        fontFamily: 'typewriter-Bold',
        lineHeight: 20,
    },
    centerLayout: {
        flexDirection: 'column',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    basicLayout: {
        flex: 1,
        justifyContent : 'center'
    },
    rowLayout: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    libraryLayout: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: "space-around",
        padding: 10,
        margin: 10,
    }
})

/**
 * Login page styling
 */
const login = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    input: {
        height: 70,
        width: 400,
        margin: 10,
        flex: 3,
        backgroundColor: 'white',
        borderRadius: 30,
        color: 'black',
        zIndex: 3
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 30,
        fontFamily: 'typewriter-Bold',
        lineHeight: 30,
    },
    emailText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 30,
        alignItems: 'center',
        fontFamily: 'typewriter-Bold',
        lineHeight: 30,
        marginRight: 55,
    },
    buttonPrimary: {
        height: 60,
        width: 300,
        margin: 10,
        flex: 1,
        backgroundColor: '#fdda64',
        borderRadius: 30,
        padding: 15,
        color: 'black',
        fontFamily: 'typewriter-Bold',
    },
    buttonBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: .5,
        borderColor: '#f8ebc4',
        height: 40,
        margin: 20,
        textAlign: 'center',
        color: 'black',
        fontSize: 25,
        fontFamily: 'typewriter-Bold',
        lineHeight: 30,
        alignSelf: 'center',
    },
    layout: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f8ebc4',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: -100
    },
    inputContainer: {
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 0.5
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'center'
    },
    logo: {
        width: 800,
        height: undefined,
        resizeMode: 'contain',
        flex: 1,
        marginTop: '5%'
    }
})


/**
 * Form styling
 */
const forms = StyleSheet.create({
    title: {
        backgroundColor: '#bb904f',
        alignItems: 'center',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 40,
        padding: 20,
        width: '100%',
        color:'white',
        fontFamily: 'Typewriter2-Bold',
        lineHeight: 30
    },
    bookInput: {
        width: '50%',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 20,
        fontSize: 30,
        color: 'black',
        fontFamily: 'typewriter-Bold',
    },
    container: {
        backgroundColor: '#feecb1',
        flex: 1,
        position: 'relative',
        width: '100%',
    },
    dropDown: {
        width: '30%',
        height: 60,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 20,
        fontSize: 30,
        color: 'black',
        fontFamily: 'typewriter-Bold',
        justifyContent: 'center'
    },
    buttonPrimary: {
        height: 60,
        width: 200,
        margin: 10,
        backgroundColor: '#fdda64',
        borderRadius: 30,
        padding: 15,
        color: 'black',
        fontFamily: 'typewriter-Bold',
    },
    buttonSecondary: {
        height: 60,
        width: 200,
        margin: 10,
        backgroundColor: '#bb904f',
        borderRadius: 30,
        padding: 15,
        color: 'white',
        fontFamily: 'typewriter-Bold',
    },
    creatorText: {
        textAlign: 'center',
        color: '#bb904f',
        fontSize: 30,
        fontFamily: 'typewriter',
        lineHeight: 30,
    },
    load: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top : 100,
        left: '25%',
        zIndex: 1,
        width: '50%',
        height: 150,
    },
    modalOverlay: {
        flex : 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    dropDownHorizontal: {
        width: '95%',
        height: 60,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 20,
        fontSize: 30,
        color: 'black',
        fontFamily: 'typewriter-Bold',
        justifyContent: 'center'
    },
})

/**
 * Button styling
 */
const buttons = StyleSheet.create({
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 25,
        fontFamily: 'typewriter-Bold',
        lineHeight: 30
    },
    buttonTextWhite: {
        textAlign: 'center',
        color: 'white',
        fontSize: 25,
        fontFamily: 'typewriter-Bold',
        lineHeight: 30
    },
    buttonPages: {
        backgroundColor: "#bb904f",
        textAlign: 'center',
        justifyContent: "center",
        alignItems: "flex-start",
        color: 'white',
        fontSize: 25,
        fontFamily: 'typewriter-Bold',
        borderRadius: 10,
        padding: 20,
    },
    textWhite: {
        textAlign: 'center',
        color: 'white',
        fontSize: 30,
        fontFamily: 'typewriter-Bold',
        lineHeight: 30,
    },
})

/**
 * Canvas styling
 */
const canvas= StyleSheet.create({
    icon: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 7,
        top: 7
    },
    roleWindow: {
        position: "absolute",
        width: 300,
        height: 300,
        left: 200,
        top: 300,
        flexDirection: "row",
        backgroundColor: "black"
    },
    roleOption: {
        height: 40,
        width: 100
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
    sideBar: {
        position: "absolute",
        left: 0,
        height: 400,
        width:  100,
        borderRadius: 5,
        backgroundColor: '#f8ebc4',
        flexDirection: 'column',
        justifyContent: "space-around",
        alignItems: "center"
    },
    sideBarOverlay: {
        height: 400,
        width:  100,
        borderRadius: 5,
        backgroundColor: '#f8ebc4',
        flexDirection: 'column',
        justifyContent: "space-around",
        alignItems: "center"
    },
    layout: {
        backgroundColor: "white",
        flex: 7,
        justifyContent:'center',
        alignItems: 'center'
    },
    pageNav: {
        backgroundColor:"#fdda64",
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: "space-around",
        padding: 15
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
    }
})

export {styles, buttons, page, canvas, login, forms}
