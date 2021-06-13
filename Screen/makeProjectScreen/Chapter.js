import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Button} from '../../src/components/Button';
import {getchapter, postoptions, createschedule} from '../../src/Api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import SchedulePopup from './SchedulePopup';
import {HelpMessage, RenderHelp} from './Help';
import ExplainModal from './ExplainModal';
import {RenderChapter} from '../../src/utils/RenderChapter';

const Chapter = (props) => {
  const [explainVisible, setExplainVisible] = useState(true);
  const [visibleconfim, setVisibleconfirm] = useState(false);
  const [schedule, setSchedule] = useState({});
  const [book, setBook] = useState();
  const [bookvisible, setBookvisible] = useState(false);
  const [chapters, setChapters] = useState([]);
  // const [chapters,setChapters] = useState( [{"book_id": 63, "created_at": "2021-05-16T13:39:00.699+09:00", "id": 729, "title": "1. 자연수의 혼합 계산", "updated_at": "2021-05-16T13:39:00.699+09:00", "weight": 1}, {"book_id": 63, "created_at": "2021-05-16T13:39:00.699+09:00", "id": 730, "title": "2. 약수와 배수", "updated_at": "2021-05-16T13:39:00.699+09:00", "weight": 1}, {"book_id": 63, "created_at": "2021-05-16T13:39:00.699+09:00", "id": 731, "title": "3. 규칙과 대응", "updated_at": "2021-05-16T13:39:00.699+09:00", "weight": 1}, {"book_id": 63, "created_at": "2021-05-16T13:39:00.699+09:00", "id": 732, "title": "4. 약분과 통분", "updated_at": "2021-05-16T13:39:00.699+09:00", "weight": 1}, {"book_id": 63, "created_at": "2021-05-16T13:39:00.699+09:00", "id": 733, "title": "5. 분수의 덧셈과 뺄셈", "updated_at": "2021-05-16T13:39:00.699+09:00", "weight": 1}, {"book_id": 63, "created_at": "2021-05-16T13:39:00.699+09:00", "id": 734, "title": "6. 다각형의 둘레와 넓이", "updated_at": "2021-05-16T13:39:00.699+09:00", "weight": 1}])
  const [toggleCheckBox, setToggleCheckBox] = useState(false); //false 휴식 허용 true 휴식 없음
  const [rest, setRest] = useState(0); //false 휴식 허용 true 휴식 없음
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (props.route.params?.selectedBook) {
      setBook(props.route.params.selectedBook);
      setBookvisible(true);
    }
  }, [props.route.params?.selectedBook]);

  const deletechapter = (key) => {
    setChapters(chapters.filter((f, idx) => idx !== key));
  };

  const goToChapterSearch = async () => {
    console.log('챕터 가져오기');
    if (book === undefined) {
      alert('책을 먼저 선택해주세요.');
    } else {
      console.log('챕터가져오기 수행!!! : ' + book.title);
      // const query = {title: book.title}
      const query = {isbn: book.isbn};
      getchapter({book: query})
        .then((res) => {
          res.data.chapters.map((chapter) => {
            chapter.weight = 1;
          });
          setChapters(res.data.chapters);
        })
        .catch((e) => {
          console.log(e);
        });
      Alert.alert(
        '챕터를 정리해주세요!',
        '올바른 일정 생성을 위하여 책의 소단원만 남기고 대단원은 삭제해주세요.',
      );
    }
  };

  const completeCreateProject = () => {
    props.navigation.popToTop();
  };

  const getPreview = () => {
    console.log('미리보기');
    if (chapters[0] === undefined) {
      alert('[2. 챕터별 가중치 설정(최소 1 이상)] 을 먼저 해주세요!');
    } else {
      setVisibleconfirm(true);
      postoptions({
        option: {
          options: chapters,
        },
      })
        .then(() => {
          createschedule(props.route.params.projectId, {rest: rest})
            .then((res) => {
              setSchedule(() => res.data.options);
              setModalVisible(true);
            })
            .catch((e) => {
              console.log(e.response);
            });
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <ScrollView>
      <View>
        <ExplainModal
          visible={explainVisible}
          setModalVisible={setExplainVisible}
        />
        <View style={styles.FormStyle}>
          <Text style={styles.subtitle}>1. 프로젝트 교재</Text>
          {bookvisible && (
            <View>
              <Image style={styles.bookImage} source={{uri: book.thumbnail}} />
              <View>
                <Text style={styles.booktitle}>제목 : {book.title}</Text>
                <Text style={styles.author}>저자 : {book.authors}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.FormStyle}>
          <Text style={styles.subtitle}>
            2. 챕터별 가중치 설정 (최소 1 이상)
            <TouchableOpacity
              onPress={() => {
                setExplainVisible(true);
              }}>
              <View style={{marginHorizontal: 5}}>
                <Icon name="comment-question-outline" color="red" size={20} />
              </View>
            </TouchableOpacity>
          </Text>
          <Button onPress={goToChapterSearch}>챕터 불러오기</Button>
          <RenderChapter chapters={chapters} deletechapter={deletechapter} />
        </View>
        <View style={styles.FormStyle}>
          <Text style={styles.subtitle}>
            3. 일정 미리보기
            <RenderHelp messagetype={HelpMessage.preview} />
          </Text>
          <View style={styles.scheduleView}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              프로젝트간 휴식 부여
            </Text>
            {toggleCheckBox ? (
              <Text style={{margin: 3}}>[true]</Text>
            ) : (
              <Text style={{margin: 3}}>[false]</Text>
            )}
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => {
                setToggleCheckBox(newValue);
                if (newValue) {
                  setRest(1);
                } else {
                  setRest(0);
                }
              }}
            />
          </View>
          <Button onPress={getPreview}>일정 미리보기</Button>
          <SchedulePopup
            visible={modalVisible}
            setModalVisible={setModalVisible}
            schedule={schedule}
            chapters={chapters}
          />
        </View>
        {visibleconfim && (
          <View style={styles.LastFormStyle}>
            <Text style={styles.subtitle}>4. 일정 확정</Text>
            <Button onPress={completeCreateProject}>일정 확정하기</Button>
          </View>
        )}
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
    marginVertical: 10,
  },
  LastFormStyle: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  scheduleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  subtitle: {
    width: '90%',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 5,
  },
  bookImage: {
    width: 200,
    height: 250,
    margin: 10,
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

export default Chapter;
