import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { FlatGrid} from "react-native-super-grid";
import { Tile } from 'react-native-elements';
/* Set state of books, adding to this adds books to the list that appear in the library */
import {buttons, styles} from "../styles/styles";
import {useNavigation} from "@react-navigation/core";


export default function BookList(library){
    //console.log("Library:")
    console.log("Passed Variable Library")
    console.log(library.library)
    let Books = library.library
    console.log(Books)
    const navigation = useNavigation()
    const page = () => navigation.navigate('Pages')
    const [books, setBooks] = React.useState(Books
    );
    if (books.length > 0) {
        return (
            <FlatGrid
                itemDimension={300}
                data={books}
                style={styles.gridView}
                spacing={10}
                renderItem={({item}) => (
                    <View style={styles.itemContainer}>
                        <Tile imageSrc={require('../assets/place-holder-open-book.png')}
                              containerStyle={styles.image}
                              title={item.bookTitle}
                              titleStyle={styles.bookText}
                              style={styles.bookText}
                              onPress={page}
                        />
                    </View>
                )}
            />
        )
    }
    else {
        return (
            <Text>"There are no books</Text>
        )
    }
};
