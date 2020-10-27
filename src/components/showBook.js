import React from 'react';
import { Image } from 'react-native';

/**
 * Displays the completed image as a JSX.Element
 * @param input: a page object
 * @returns {JSX.Element}
 * @constructor
 */
const ShowBooks = (input) => {
    console.log("The pageNum for this page = " + input.pageNum)
    console.log("input.imageString: " + input.imageString);
    if (input.imageString === "") {
        console.log("showing in construction");
        return (
            <Image source={require("../assets/images/construction.png")}
                   resizeMode={'contain'}
                   style={{width: '100%',
                       height: '100%',
                       alignItems:"center",
                       justifyContent:"center"}
                   }/>
        );
    } else {
        console.log("showing final image")
        return(
            <Image source={{uri: 'data:image/png;base64,' + input.imageString}}
                   resizeMode={'contain'}
                   style={{width: '100%',
                       height: '100%',
                       alignItems:"center",
                       justifyContent:"center"}
                   }/>
        );
    }
}

export default ShowBooks;
