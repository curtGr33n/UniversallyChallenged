import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { FlatGrid} from "react-native-super-grid";
import { Tile } from 'react-native-elements';
/* Set state of books, adding to this adds books to the list that appear in the library */
import {styles} from "../styles/styles";
import {useNavigation} from "@react-navigation/core";


export default function BookList() {
    const navigation = useNavigation()
    const page = () => navigation.navigate('Pages')
    const [books, setBooks] = React.useState([
        /* id: <book id>, book: <Tile object that can be displayed in a list> */
        {   id: 1,
            _imageSrc: require('../assets/place-holder-open-book.png'),
            _title: 'Test_1',
        },
        {   id: 2,
            _imageSrc: require('../assets/place-holder-open-book.png'),
            _title: 'Test_2',
        },
        {   id: 3,
            _imageSrc: require('../assets/place-holder-open-book.png'),
            _title: 'Test_3',
        },
        {   id: 4,
            _imageSrc: require('../assets/place-holder-open-book.png'),
            _title: 'Test_4',
        },
        {   id: 5,
            _imageSrc: require('../assets/place-holder-open-book.png'),
            _title: 'Test_5',
        },
        {   id: 6,
            _imageSrc: require('../assets/place-holder-open-book.png'),
            _title: 'Test_6',
        },
        {   id: 7,
            _imageSrc: require('../assets/place-holder-open-book.png'),
            _title: 'Test_7',
        },
        {   id: 8,
            _imageSrc: require('../assets/place-holder-open-book.png'),
            _title: 'Test_8',
        },
        {   id: 9,
            _imageSrc: require('../assets/place-holder-open-book.png'),
            _title: 'Test9',
        },
        {   id: 10,
            _imageSrc: require('../assets/place-holder-open-book.png'),
            _title: 'Test_10',
        },
        {   id: 11,
            _imageSrc: require('../assets/place-holder-open-book.png'),
            _title: 'Test_11',
        },
        {   id: 12,
            _imageSrc: require('../assets/place-holder-open-book.png'),
            _title: 'Test_12',
        }
    ]);

    return (
        <FlatGrid
            itemDimension={300}
            data={books}
            style={styles.gridView}
            spacing={10}
            renderItem={({item}) => (
                <View style={styles.itemContainer}>
                    <Tile imageSrc={item._imageSrc}
                          containerStyle={styles.image}
                          title={item._title}
                          titleStyle={styles.bookText}
                          style={styles.bookText}
                          onPress={page}
                    />
                </View>
            )}
        />
    )
};
