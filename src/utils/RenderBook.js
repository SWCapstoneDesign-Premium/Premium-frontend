import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

export function RenderBook({booklist, registerBook}) {
  return (
    <View style={styles.booklist}>
      {booklist.map((book, key) => {
        return (
          <TouchableOpacity
            style={styles.book}
            key={key}
            onPress={() => registerBook(book)}>
            <Image style={styles.thumbnail} source={{uri: book.thumbnail}} />
            <View>
              <Text style={styles.booktitle}>제목 : {book.title}</Text>
              <Text style={styles.author}>저자 : {book.authors}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  booklist: {
    flex: 1,
    padding: 10,
  },
  book: {
    margin: 5,
    padding: 15,
    borderRadius: 15,
    elevation: 20,
  },
  thumbnail: {
    borderRadius: 13,
    width: 160,
    height: 200,
  },
  booktitle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  author: {
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
});
