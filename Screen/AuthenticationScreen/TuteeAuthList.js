import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {getattendances} from '../../src/Api';
import {Card} from 'react-native-paper';
import colors from '../../src/colors';
import authBtn from '../../assets/authBtn-001.png';
import {ScrollView} from 'react-native';

const moment = require('moment');

const ProjectAuthCard = ({navigation, project}) => {
  console.log(project);
  const now = moment().format('YYYY-MM-DD');
  const startDate = moment(project.project.started_at).format('YYYY-MM-DD');
  const realnow = moment(now);
  const realstartDate = moment(startDate);
  const remainDay = realnow.diff(realstartDate, 'days'); //시작하는 날짜가 0일차
  var pastDay = project.project.duration;

  if (remainDay >= 0) {
    pastDay = project.project.duration - remainDay;
  }
  return (
    <View style={{flexDirection: 'row'}}>
      <Card>
        <TouchableOpacity onPress={() => navigation('ProjectDetail', project)}>
          <View style={cardstyles.card}>
            <View
              style={{
                justifyContent: 'center',
                height: '100%',
                paddingHorizontal: 15,
              }}>
              <Text style={cardstyles.textstyle}>{project.project.title}</Text>
              <View style={{marginTop: 5}}>
                {remainDay >= 0 ? (
                  <View>
                    <View style={{flexDirection: 'row', margin: 5}}>
                      <Text style={cardstyles.dayStyle}>{remainDay + 1} </Text>
                      <Text style={cardstyles.dayStyle2}>일 차</Text>
                    </View>
                    {pastDay < 1 ? (
                      <Text style={cardstyles.dayStyle3}>
                        프로젝트가 끝났습니다.
                      </Text>
                    ) : (
                      <Text style={cardstyles.dayStyle3}>
                        남은 일일인증 {pastDay - 1}개
                      </Text>
                    )}
                  </View>
                ) : (
                  <View>
                    <View style={{flexDirection: 'row', margin: 2}}>
                      <Text style={cardstyles.dayStyle}>프로젝트</Text>
                      <Text style={cardstyles.dayStyle2}> 시작 전입니다.</Text>
                    </View>
                    {pastDay < 1 ? (
                      <Text style={cardstyles.dayStyle3}>
                        프로젝트가 끝났습니다.
                      </Text>
                    ) : (
                      <Text style={cardstyles.dayStyle3}>
                        남은 일일인증 {pastDay}개
                      </Text>
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
      {remainDay < 0 ? (
        <View style={{width: 90, height: 100}}></View>
      ) : (
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => {
            navigation('TuteeAuthdetail', {project, remainDay, pastDay});
          }}>
          <Image source={authBtn} style={{width: 90, height: 100}}></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

const TuteeAuthList = ({navigation}) => {
  const [projects, setProjects] = useState();
  const [user, setUser] = useState();
  navigation.addListener('focus', (e) => {
    getattendances()
      .then((res) => setProjects(res.data))
      .catch((err) => console.log('attendances', err));
  });

  useEffect(() => {
    console.log('Auth');
    getattendances()
      .then((res) => setProjects(res.data))
      .catch((err) => console.log('attendances', err));
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        {projects ? (
          <ScrollView>
            {projects.map((project, index) => {
              return (
                <View
                  style={{
                    margin: 10,
                    backgroundColor: colors.maincolor,
                    borderRadius: 20,
                    marginBottom: 20,
                  }}
                  key={index}>
                  <ProjectAuthCard
                    navigation={navigation.navigate}
                    project={project}
                    tutee={project.tutee}></ProjectAuthCard>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <Text>진행 중인 프로젝트가 없습니다</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  imgStyle: {
    width: 180,
    height: 180,
    borderRadius: 20,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 25,
  },
  subStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    color: '#2E3E5C',
  },
  dayStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#2E3E5C',
  },
};

const cardstyles = {
  card: {
    borderWidth: 0,
    borderRadius: 20,
    width: 300,
    height: 110,
    flexDirection: 'row',
  },
  textstyle: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 2,
  },
  dayStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'red',
  },
  dayStyle2: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  dayStyle3: {
    fontSize: 15,
    color: '#9E9E9E',
    margin: 2,
  },
};
export default TuteeAuthList;
