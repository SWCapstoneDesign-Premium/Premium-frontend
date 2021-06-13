import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import {Button} from '../../src/components/Button';
import {getBook, createBook, updateproject} from '../../src/Api';
import colors from '../../src/colors';
import {RenderBook} from '../../src/utils/RenderBook';

const Book = (props) => {
  const [title, setTitle] = useState('');
  const [booklist, setBooklist] = useState([]);
  const [bookid, setBookid] = useState();
  const requestBookSearch = () => {
    console.log('request book search');
    console.log(title);
    if (title === '') {
      alert('교재 제목을 입력해주세요!');
    } else {
      getBook({
        target: 'title',
        query: title,
        size: 20,
      })
        .then((res) => {
          setBooklist(res.data.documents);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const registerBook = (book) => {
    console.log(book.title);
    createBook({
      title: book.title,
      author: book.authors,
      content: book.contents,
      isbn: book.isbn,
      publisher: book.publisher,
      image: book.thumbnail,
      url: book.url,
    })
      .then((res) => {
        setBookid(res.data.id);
        updateproject(props.route.params.projectId, {
          project: {
            book_id: res.data.id,
          },
        })
          .then(() => {
            props.navigation.navigate({
              name: 'Chapter',
              params: {
                selectedBook: book,
                projectId: props.route.params.projectId,
              },
            });
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <ScrollView>
      <View>
        <View style={styles.FormStyle}>
          <Text style={styles.subtitle}>책 검색</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => setTitle(text)}
            placeholder="프로젝트에서 사용하실 교재를 검색해주세요."
          />
          <Button onPress={requestBookSearch}>검색</Button>
        </View>
        <View>
          <RenderBook booklist={booklist} registerBook={registerBook} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  FormStyle: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textinput: {
    height: 40,
    width: '90%',
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.maincolor,
    fontSize: 15,
    fontWeight: 'bold',
  },
  subtitle: {
    width: '90%',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Book;
