import React from 'react';
import {View, Text, Image } from 'react-native';



const ShowBooks = (input) => {
    const imageList =
        [require('../assets/current-book-pages/page0.png'),
            require('../assets/current-book-pages/page1.png'),
            require('../assets/current-book-pages/page2.png'),
            require('../assets/current-book-pages/page3.png'),
            require('../assets/current-book-pages/page4.png'),
            require('../assets/current-book-pages/page5.png'),
            require('../assets/current-book-pages/page6.png'),
            require('../assets/current-book-pages/page7.png'),
            require('../assets/current-book-pages/page8.png'),
            require('../assets/current-book-pages/page9.png'),
            require('../assets/current-book-pages/page10.png'),
            require('../assets/current-book-pages/page11.png'),
            require('../assets/current-book-pages/page12.png'),
            require('../assets/current-book-pages/page13.png'),
            require('../assets/current-book-pages/page14.png')];

    console.log(input.pageNum)
    return(
        <Image source={imageList[input.pageNum]}
               resizeMode={'contain'}
               style={{width: '100%',
                   height: '100%',
                   alignItems:"center",
                   justifyContent:"center"}
               }/>
    )
}

export default ShowBooks;
