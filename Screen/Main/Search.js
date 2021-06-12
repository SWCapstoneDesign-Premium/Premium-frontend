import React, {Component, useState} from 'react';
import {CircularCard} from 'react-native-circular-card-view';
import {SafeAreaView} from 'react-native';
import {useEffect} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  FlatList,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Searchbar, Card} from 'react-native-paper';
import {getprojects} from '../../src/Api';
import colors from '../../src/colors';
import {setSearchHistory} from '../../src/Asyncstorage';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
const moment = require('moment');
function SearchCard(props) {
  const {width, height} = useWindowDimensions();
  const project = props.project;
  const tutor = props.project.tutor;
  const startDate = moment(project.started_at).format('YYYY-MM-DD');

  return (
    <View style={cardstyles.container}>
      <TouchableOpacity
        style={cardstyles.cardPosition}
        onPress={() => {
          props.navigation.navigate('ProjectDetail', {project: project});
        }}>
        <Card style={cardstyles.cardstyle}>
          <Text style={cardstyles.prjName}>{project.title}</Text>
          <Text style={cardstyles.txtstyle}>{project.description}</Text>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Text style={cardstyles.txtstyle}>{project.deposit} 원 | </Text>
            <Text style={cardstyles.txtstyle}>{project.duration} 일</Text>
          </View>
          <Text style={cardstyles.txtstyle}>{startDate} 부터 시작</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        style={cardstyles.tutorPosition}
        onPress={() =>
          props.navigation.navigate('ProfileView', {latestpr: project})
        }>
        {tutor.image !== ' ' ? (
          <Image
            style={{
              width: width * 0.2,
              height: height * 0.1,
              borderRadius: 10,
              marginLeft: 10,
            }}
            source={{
              uri: tutor.image,
            }}
          />
        ) : (
          <Icon name="user" size={50} style={{margin: 25}} color="black" />
        )}

        <Text style={cardstyles.tutorName}>{tutor.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

function Search({navigation}) {
  const [Searchblur, SetSearchblur] = useState(false);
  const [SearchData, SetSearchData] = useState('');
  const [enterSearch, setEnterSearch] = useState('');
  const [isLoading, SetIsLoading] = useState(false);
  const [reqData, SetreqData] = useState([]);
  const [history, sethistory] = useState([]);
  const [keywords, setKeywords] = useState([]);
  let ScreenWidth = Dimensions.get('window').width; //screen 너비
  let ScreenHeight = Dimensions.get('window').height; //height 높이

  const ChangeSearchData = (text) => {
    SetSearchData(text);
  };

  const setAsync = (value) => {
    console.log(value);
    sethistory([value, ...history]);
    console.log('add history', history);
    AsyncStorage.getItem('keyword')
      .then((req) => JSON.parse(req))
      .then((json) => {
        console.log(json);
        setKeywords(json);
      })
      .catch((error) => console.log(error));
    setSearchHistory(history);
    console.log('asny', history);
  };

  async function SearchVal() {
    if (SearchData.length <= 0) {
      alert('2글자 이상의 검색어를 입력해주세요');
    } else {
      console.log(SearchData);
      sethistory([SearchData, ...history]);
      setSearchHistory(history);
      setEnterSearch(SearchData);
      setAsync(SearchData);
      const query = {title_or_description_i_cont: SearchData};
      const data = (await getprojects({q: query})).data;
      SetreqData(data);
    }
  }
  useEffect(() => {
    if (Searchblur) {
      SetSearchblur(false);
    }
    AsyncStorage.getItem('keyword')
      .then((req) => JSON.parse(req))
      .then((json) => {
        if (json !== null) {
          console.log(json);
          setKeywords(json);
        }
      })
      .catch((error) => console.log(error));
  }, [reqData]);

  async function pressHistory(value) {
    setEnterSearch(value);
    const query = {title_or_description_i_cont: value};
    const data = (await getprojects({q: query})).data;
    SetreqData(data);
    console.log('press', history);
  }
  const SearchHistoryCard = (props) => {
    const keyword = props.value;
    return (
      <TouchableOpacity onPress={() => pressHistory(keyword)}>
        <Card style={cardstyles.searchCard}>
          <Text style={cardstyles.searchTxt}>{keyword}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            height: 80,
            backgroundColor: colors.maincolor,
            justifyContent: 'center',
            paddingHorizontal: 8,
          }}>
          <Searchbar
            placeholder="검색어를 입력해주세요"
            onChangeText={ChangeSearchData}
            //onIconPress={SearchVal}
            onSubmitEditing={SearchVal}
            onKeyPress={(e) => {
              if (e.key === 'Enter') console.log('엔터클릭');
            }}
          />
        </View>
        <View style={styles.Searchlist}>
          {reqData && enterSearch ? (
            <>
              {reqData.length > 0 ? (
                <FlatList
                  //style={{backgroundColor:Searchblur? 'rgba(0,0,0,0.3)':''}}
                  data={reqData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <SearchCard
                      navigation={navigation}
                      project={item}
                      key={index}></SearchCard>
                  )}
                />
              ) : (
                <View>
                  <Text style={styles.searchtxt}>
                    찾는 프로젝트가 없습니다.
                  </Text>
                </View>
              )}
            </>
          ) : (
            <>
              <Text style={styles.searchtxt}>최근 검색어</Text>
              {keywords.length !== 0 ? (
                <>
                  {keywords.map((keyword, index) => {
                    return <SearchHistoryCard value={keyword} key={index} />;
                  })}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const cardstyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
  },
  cardPosition: {
    flex: 3,
  },
  cardstyle: {
    padding: 15,
  },
  tutorPosition: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  tutorName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: '25%',
    padding: 7,
  },
  prjName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  txtstyle: {
    color: 'gray',
  },
  searchCard: {
    padding: 20,
    marginBottom: 5,
  },
  searchTxt: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const styles = StyleSheet.create({
  Searchlist: {
    flex: 1,
    padding: 10,
  },
  Serach: {
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
  Serachtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  author: {
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  searchtxt: {
    margin: 10,
    fontSize: 20,
    color: 'gray',
  },
});
export default Search;
