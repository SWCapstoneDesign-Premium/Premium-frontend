import React, {useEffect, useState} from 'react';
import colors from '../../src/colors';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
  LogBox,
} from 'react-native';
import {Button} from '../../src/components';
import {gettutees, getPlan} from '../../src/Api';
import Calender from '../../src/components/Calender';

const moment = require('moment');
LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

const TutorAuthentication = ({navigation, route}) => {
  const calendarform = new Object({project: route.params.project});
  const [tutees, setTutees] = useState();
  const [notconfirmed, setNotconfirmed] = useState();
  const project = route.params.project;
  const [howmany, setHowmany] = useState(0);
  var [plans, setPlans] = useState();
  var [chapter, setChapter] = useState();
  const now = moment().format('YYYY-MM-DD');
  const startDate = moment(project.started_at).format('YYYY-MM-DD');
  const realnow = moment(now);
  const realstartDate = moment(startDate);
  const remainDay = realnow.diff(realstartDate, 'days');
  var pastDay = project.duration;

  if (remainDay >= 0) {
    pastDay = project.duration - remainDay;
  }
  console.log('☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆');
  console.log(project);
  console.log('☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆');
  const todayChapter = (plansT) => {
    const now = moment();
    plansT.map((plan) => {
      let difStart = now.diff(moment(plan.start_at), 'days');
      let difEnd = now.diff(moment(plan.end_at), 'days');
      if (difStart >= 0 && difEnd <= 0) setChapter(plan.chapter.title);
    });
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      gettutees({
        project_id: project.id,
      })
        .then((res) => {
          const todayauth = res.data.filter((auth) => {
            const created = moment(auth.created_at).format('YYYY-MM-DD');
            const realcreated_at = moment(created);
            return realnow.diff(realcreated_at, 'days') === 0;
          });
          const todaynotconfirmedauth = todayauth.filter((auth) => {
            return auth.status !== 'confirm';
          });
          const nottodayauth = res.data.filter((auth) => {
            const created = moment(auth.created_at).format('YYYY-MM-DD');
            const realcreated_at = moment(created);
            return realnow.diff(realcreated_at, 'days') !== 0;
          });
          const nottodaynotconfirm = nottodayauth.filter((auth) => {
            return auth.status !== 'confirm';
          });

          getPlan({
            project_id: project.id,
          })
            .then((res) => {
              setPlans(res.data);
              todayChapter(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          setNotconfirmed(nottodaynotconfirm);
          setTutees(todaynotconfirmedauth);
          setHowmany(todayauth.length - todaynotconfirmedauth.length);
        })
        .catch((err) => {
          console.log('--------------get tutees 에러 ---------------');
          console.log(err);
        });
    });
  }, []);

  function TuteeListComponent({tutee, navigation, project}) {
    const tuteeinfo = tutee.target;

    return (
      <View style={styles.tuteeBarStyle}>
        <Icons name="face" size={30} style={{marginLeft: '8%'}}></Icons>
        <Text style={styles.tuteenameStyle}>{tuteeinfo.name}</Text>
        <TouchableOpacity
          style={styles.tuteeBtnPosition}
          onPress={() => {
            navigation.push('TutorAuthCheck', {tutee, project});
          }}>
          <View>
            <Text style={styles.BtntextStyle}>인증 확인</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.authratestyle}>
        <View style={styles.precentPosition}>
          <Text style={styles.presentTextStyle}>현재 진행률</Text>
          <Text style={styles.percentStyle}>
            {remainDay + 1} / {project.duration}
          </Text>
        </View>
        <View style={styles.precentPosition}>
          <Text style={styles.authTextStyle}>오늘 인증 완료</Text>
          <Text style={styles.percentStyle}>{howmany} 명</Text>
        </View>
      </View>
      <View style={styles.todayplanBack}>
        <Text style={styles.titleTxt}>전체일정 💫</Text>
        <Calender plans={plans} project={calendarform} />
      </View>
      <View style={{marginRight: '55%', marginBottom: '5%'}}>
        <Text style={styles.authtuteeStyle}> 오늘의 인증</Text>
      </View>
      {pastDay > 0 ? (
        <View style={{alignItems: 'center'}}>
          {tutees ? (
            <View style={styles.tuteelistview}>
              {tutees.map((tutee, index) => {
                return (
                  <TuteeListComponent
                    tutee={tutee}
                    navigation={navigation}
                    key={index}
                    project={project}
                  />
                );
              })}
            </View>
          ) : null}
        </View>
      ) : (
        <View>
          <View style={{marginTop: 100, marginBottom: 195}}>
            <Text style={styles.paytxtStyle}>
              이 프로젝트는 완료된 프로젝트 입니다!
            </Text>
          </View>
          <Button
            onPress={() => {
              navigation.push('AuthPayBack', {project});
            }}
            style={{width: '100%'}}>
            <Text>보증금 환급 받기!</Text>
          </Button>
        </View>
      )}
      <View style={{marginRight: '55%', marginBottom: '5%'}}>
        <Text style={styles.authtuteeStyle}> 확인이 안된 인증</Text>
      </View>
      {notconfirmed ? (
        <View style={styles.tuteelistview}>
          {notconfirmed.map((tutee, index) => {
            return (
              <TuteeListComponent
                tutee={tutee}
                navigation={navigation}
                key={index}
                project={project}
              />
            );
          })}
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  authratestyle: {
    flexDirection: 'row',
    borderColor: '#D0DBEA',
    borderBottomWidth: 2,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('window').height * 0.2,
  },
  precentPosition: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  presentTextStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.maincolor,
    marginBottom: '10%',
  },
  authTextStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FF6464',
    marginBottom: '10%',
  },
  percentStyle: {
    fontWeight: 'bold',
    color: '#9FA5C0',
    fontSize: 25,
  },
  authtuteeStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#9FA5C0',
  },
  tuteeBarStyle: {
    backgroundColor: '#D0DBEA',
    width: '100%',
    height: 50,
    marginBottom: '5%',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
  },
  tuteenameStyle: {
    marginLeft: '5%',
    fontSize: 20,
  },
  tuteeBtnPosition: {
    marginLeft: '28%',
    backgroundColor: colors.maincolor,
    width: '30%',
    height: '60%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtntextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  paytxtStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  prjtitlestlye: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  tuteelistview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
  },
  todayplanBack: {
    flex: 1,
    padding: 20,
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 8,
    paddingBottom: 13,
  },
});

export default TutorAuthentication;
