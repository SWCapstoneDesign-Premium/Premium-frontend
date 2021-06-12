import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import authBtn from '../../assets/authBtn-001.png';

const moment = require('moment');
class Projectcard extends Component {
  render() {
    //console.log(this.props.data)
    const now = moment().format('YYYY-MM-DD');
    const project = this.props.data;
    const startDate = moment(project.started_at).format('YYYY-MM-DD');
    const realnow = moment(now);
    const realstartDate = moment(startDate);
    const remainDay = realnow.diff(realstartDate, 'days'); //시작하는 날짜가 0일차
    var pastDay = project.duration;
    if (remainDay >= 0) {
      pastDay = project.duration - remainDay;
    }
    return (
      <View style={styles.container}>
        <Card>
          <View style={styles.card}>
            <View style={styles.containerInner}>
              <Text style={styles.textstyle}>{project.title}</Text>
              <View>
                {remainDay >= 0 ? (
                  <View style={{flexDirection: 'row', margin: 2}}>
                    <Text style={styles.dayStyle}>{remainDay + 1} </Text>
                    <Text style={styles.dayStyle2}>번째 인증</Text>
                  </View>
                ) : (
                  <View style={{flexDirection: 'row', margin: 2}}>
                    <Text style={styles.dayStyle}>프로젝트</Text>
                    <Text style={styles.dayStyle2}> 시작 전입니다.</Text>
                  </View>
                )}
                {pastDay - 1 < 0 ? (
                  <Text style={styles.dayStyle3}>프로젝트가 끝났습니다.</Text>
                ) : (
                  <Text style={styles.dayStyle3}>
                    남은 인증 {pastDay - 1}개
                  </Text>
                )}
              </View>
            </View>
          </View>
        </Card>

        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => {
            this.props.navigation.navigate('Authentication', {project});
          }}>
          <Image source={authBtn} style={{width: 90, height: 100}} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginLeft: 25,
    borderRadius: 8,
    height: 110,
  },
  containerInner: {
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 15,
  },
  card: {
    borderWidth: 0,
    borderRadius: 20,
    width: 270,
    height: '100%',
    justifycontent: 'center',
  },
  textstyle: {
    fontSize: 19,
    margin: 2,
  },
  dayStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'red',
  },
  dayStyle2: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  dayStyle3: {
    fontSize: 15,
    color: '#9E9E9E',
    margin: 2,
  },
};

export default Projectcard;

