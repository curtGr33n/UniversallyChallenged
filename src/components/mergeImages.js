import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {canvas} from "../styles/styles";
import RNImageTools from "react-native-image-tools-wm";

function MergeImages(bookId, pageId) {
    const [images, setImages] = useState([])
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

                const roles = ["background", "illustrator", "writer"];
                let temp = ["", "", ""];
                for (let i = 0; i < data.length; i++) {
                    for (let r = 0; r < roles.length; r++) {
                        if (data[i].role === roles[r]) {
                            temp[r] = data[i].canvas;
                        }
                    }
                }
                console.log(temp);
                setImages(temp);
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
