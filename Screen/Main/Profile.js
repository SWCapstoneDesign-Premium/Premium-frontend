/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef, useContext} from 'react';
import RNRestart from 'react-native-restart';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import {Title, Caption, Text} from 'react-native-paper';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {TabView} from 'react-native-tab-view';
import colors from '../../src/colors';
import {
  logout,
  getcurrentuser,
  getattendances,
  tutorgetproject,
  getlikes,
} from '../../src/Api';
import cat from '../../assets/cat2.png';
import {EachTabViewsProjects, renderTabBar} from '../../src/utils/EachTab';
import {CurrentUser} from '../../src/utils/CurrentUser';
import LoadingModal from '../../src/components/LoadingModal';

const Profile = (props) => {
  const [myinfo, setMyinfo] = useContext(CurrentUser);
  const showscreen = useRef(false);
  const [project, setProject] = useState([]);
  const [finishedproject, setFinishedProject] = useState([]);
  const [school, setSchool] = useState('아주대학교');
  const [mylikelists, setMylikelists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const rerender = props.navigation.addListener('focus', (e) => {
      console.log('welcome back');
      getcurrentuser()
        .then((res) => {
          console.log('◇◇◇◇◇◇◇◇◇get current user◇◇◇◇◇◇◇◇');
          console.log(res.data);
          console.log('◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇');
          setMyinfo(res.data);
          if (res.data.type === 'Tutee') {
            getattendances()
              .then((res) => {
                getlikes()
                  .then((res) => {
                    console.log(res.data);
                    setMylikelists(res.data);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
                console.log(res.data);
                const finished = res.data.filter((pr) => {
                  console.log(pr.project.status);
                  return pr.status === 'done';
                });
                const inprogress = res.data.filter((pr) => {
                  console.log(pr.project.status);
                  return pr.status !== 'done';
                });
                setFinishedProject(finished);
                setProject(inprogress);
              })
              .catch((e) => {
                console.log(
                  '-----------------get attendance error----------------',
                );
                console.log(e);
              });
          } else {
            tutorgetproject({
              q: {tutor_id_eq: res.data.id},
            })
              .then((res) => {
                console.log('tutor get project list complete');
                console.log(res.data);
                const finished = res.data.filter((pr) => {
                  console.log(pr.status);
                  return pr.status === 'done';
                });
                const inprogress = res.data.filter((pr) => {
                  console.log(pr.status);
                  return pr.status !== 'done';
                });
                setFinishedProject(finished);
                setProject(inprogress);
              })
              .catch((e) => {
                console.log('=======get tutor project error========');
                console.log(e);
              });
          }
          showscreen.current = true;
        })
        .catch((e) => {
          console.log(e);
          alert('get user info error!!');
        });
    });
    return rerender;
  }, [props.navigation]);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: '진행 중'},
    {key: 'second', title: '완료'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <EachTabViewsProjects
            project={project}
            navigation={props.navigation}
            usertype={myinfo.type}
          />
        );
      case 'second':
        return (
          <EachTabViewsProjects
            project={finishedproject}
            navigation={props.navigation}
            usertype={myinfo.type}
          />
        );
    }
  };

  const handleChangeProfile = () => {
    props.navigation.navigate('Modifyprofile', {myinfo, project});
  };

  const handleLogoutPress = () => {
    //로그아웃 function
    console.log('로그아웃 버튼 눌림!');
    setModalVisible(true);
    logout()
      .then(async (res) => {
        console.log('로그아웃 성공!!!');
        await AsyncStorage.removeItem('token');
        RNRestart.Restart();
      })
      .catch((e) => {
        console.log('================== 로그아웃 에러 ==================');
        console.log(e);
      });
  };

  const goToCreateProject = () => {
    console.log('프로젝트 생성하러가기 ', project[0]?.able_start);
    if (project.length === 0) {
      props.navigation.navigate('ProjectForm');
    } else {
      if (!project[0]?.able_start) {
        Alert.alert(
          '이미 생성된 프로젝트가 있습니다.',
          '튜터는 한번에 1개의 프로젝트만 진행하실 수 있습니다. 기존의 프로젝트를 삭제하시거나 수정해주세요.',
        );
      } else {
        props.navigation.navigate('ProjectForm');
      }
    }
  };
  const goToAuth = () => {
    console.log('인증하러 하러가기');
    if (myinfo.type == 'Tutor') {
      props.navigation.navigate('SchoolAuth');
    } else if (myinfo.type == 'Tutee') {
      props.navigation.navigate('Authentication');
    } else {
      console.log('check userinfo type!!!!');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {showscreen && (
        <View
          style={{flexDirection: 'row', marginTop: 30, paddingHorizontal: 20}}>
          <TouchableOpacity
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
            onPress={() => props.navigation.navigate('UserProfileUpload')}>
            {myinfo.image === ' ' ? (
              <Image source={cat} style={styles.avatar} />
            ) : (
              <Image source={{uri: myinfo.image}} style={styles.avatar} />
            )}
          </TouchableOpacity>
          <View style={{width: '70%'}}>
            <View style={[styles.userinfoWrapper, {height: 50}]}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {myinfo.name}
              </Text>
              <TouchableOpacity onPress={handleChangeProfile}>
                <FontIcon name="gear" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.userinfoWrapper}>
              {myinfo.type === 'Tutor' ? (
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon name="teach" color="#F63D3D" size={20} />
                    <Text style={(styles.caption, {color: '#F63D3D'})}>
                      {myinfo.type}
                    </Text>
                  </View>
                  <Text style={(styles.caption, {color: '#F48705'})}>
                    [ {myinfo.status} ]
                  </Text>
                </View>
              ) : (
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon name="book-open-variant" color="#7EB3D9" size={20} />
                    <Icon name="human-child" color="#7EB3D9" size={20} />
                  </View>
                  <Text style={(styles.caption, {color: '#7EB3D9'})}>
                    {myinfo.type}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.buttonposition}
                onPress={handleLogoutPress}>
                <Text style={styles.buttonstyle}>로그 아웃</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {showscreen && (
        <View
          style={{
            height: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="school"
              color="#777777"
              size={20}
              style={{textAlignVertical: 'center', marginLeft: 10}}
            />
            <Text
              style={{
                color: '#777777',
                marginLeft: 10,
                textAlignVertical: 'center',
              }}>
              {school}
            </Text>
          </View>
          {myinfo.type === 'Tutor' && myinfo.status === 'approved' ? (
            <TouchableOpacity
              style={[styles.buttonposition, {width: 140}]}
              onPress={goToCreateProject}>
              <Text style={styles.buttonstyle}>프로젝트 생성</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.buttonposition, {width: 140}]}
              onPress={goToAuth}>
              <Text style={styles.buttonstyle}>인증하러가기</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {showscreen && (
        <View style={styles.infoBoxWrapper}>
          <View style={styles.infoBox}>
            <Title>{project.length}</Title>
            <Caption>진행중인 프로젝트</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{finishedproject.length}</Title>
            <Caption>종료된 프로젝트</Caption>
          </View>

          {myinfo.type === 'Tutor' ? (
            <View style={styles.infoBox}>
              <Title>{myinfo.likes_count}</Title>
              <Caption>좋아요 개수</Caption>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.infoBox}
              onPress={() =>
                props.navigation.navigate('MyLike', {mylikelists})
              }>
              <Title>{mylikelists.length}</Title>
              <Caption>좋아요 개수</Caption>
            </TouchableOpacity>
          )}
        </View>
      )}

      {showscreen && (
        <View style={styles.menuItem}>
          <Icon name="book" color="black" size={25} />
          <Text style={styles.menuItemText}>Projects</Text>
        </View>
      )}

      {showscreen && (
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      )}
      <LoadingModal visible={modalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userinfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBoxWrapper: {
    justifyContent: 'space-around',
    alignContent: 'center',
    flexDirection: 'row',
    height: 100,
  },
  row: {
    height: 30,
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    borderTopWidth: 3,
    borderTopColor: '#dddddd',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 26,
  },
  avatar: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 50,
  },

  buttonposition: {
    width: 100,
    height: 30,
    backgroundColor: colors.maincolor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  buttonstyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modifybuttonstyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  buttonposition_createpro: {
    width: 140,
    height: 30,
    backgroundColor: colors.maincolor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    position: 'absolute',
    right: 40,
  },
});

export default Profile;
