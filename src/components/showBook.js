import React from 'react';
import {Image, View} from 'react-native';

/**
 * Displays the completed image as a JSX.Element
 * @param input: a page object
 * @returns {JSX.Element}
 * @constructor
 */
const ShowBooks = (input) => {
    // console.log("The pageNum for this page = " + input.pageNum)
    // console.log("input.imageString: " + input.imageString);

    if (input.imageString === "") {
        // console.log("showing in construction");
        return (
            <Image source={require("../assets/images/construction.png")}
                   resizeMode={'contain'}
                   style={{width: '100%',
                       height: '100%',
                       alignItems: "center",
                       justifyContent: "center"}
                   }/>
        );
    } else if (input.role === "writer") {
        console.log("render in here");
        // position text at top, otherwise the cropped image from the database looks stretched
        return (
            <View
                style={{
                    height: 515,
                    width: 1300,
                    alignContent: "center",
                    alignSelf: "flex-start"
                }}>
                <View
                    style={{
                        height: 80,
                        flexDirection: "column",
                        alignContent: "flex-start"
                    }}>
                    <View style={{
                        flex: 1,
                        alignItems: "center"
                    }}>
                        <Image source={{uri: 'data:image/png;base64,' + input.imageString}}
                               resizeMode={'contain'}
                               style={{
                                   width: '100%',
                                   height: '100%',
                                   alignItems:"center",
                                   justifyContent:"center"}
                               }
                        />
                    </View>
                </View>
                <View style={{flexGrow: 8, backgroundColor: "transparent"}}/>
            </View>
        )
    } else {
        return (
            <Image source={{uri: 'data:image/png;base64,' + input.imageString}}
                   resizeMode={'contain'}
                   style={{width: '100%',
                       height: '100%',
                       alignItems:"center",
                       justifyContent:"center"}
                   }/>
       )
    }
}

export default ShowBooks;
