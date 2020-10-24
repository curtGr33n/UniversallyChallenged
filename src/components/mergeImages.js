import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {canvas} from "../styles/styles";
import RNImageTools from "react-native-image-tools-wm";

function MergeImages(bookId, pageId) {
    const [images, setImages] = useState(["", "", ""])
    const [count, setCount] = useState(0);

    const getImages = async () => {
        console.log("getImages");
        try {
            const url = "http://deco3801-universally-challenged.uqcloud.net/getCreator?";
            const query = "bookId=70&pageId=0";
            let response = await fetch(url + query);
            if (response.ok) {
                console.log("successful response");
                let data = await response.json();
                console.log(data.length);

                // const roles = ["background, illustrator, writer"];
                // while (count < 3) {
                //     console.log("here");
                //     for (let i = 0; i < data.length; i ++) {
                //         if (data[i].role === roles[count]) {
                //             console.log(data[i].role + " " + data[i].final);
                //             images[count] = data[i].final;
                //             setCount(count + 1);
                //         }
                //     }
                // }
                console.log(images);
            } else {
                console.log("response not ok");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const merge = () => {

    }

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity
                style={canvas.button}
                onPress={() => getImages()}
            >
                <Text style={{fontSize: 20}}>getImages</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MergeImages;
