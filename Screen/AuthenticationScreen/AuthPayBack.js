import React, {Component, useState, Animated} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Alert,
  ScrollView,
} from 'react-native';
import colors from '../../src/colors';
import {Button} from '../../src/components';
import cat from '../../assets/cat2.png';
import {projectrefund} from '../../src/Api';

const AuthPay = ({navigation, route}) => {
  const [rate, setRate] = useState([
    {id: 0, title: 'Auhrate', rate: 30},
    {id: 1, title: 'Progressrate', rate: 100},
  ]);
  const [ratebar, setRatebar] = useState([
    {id: 0, title: 'Auhrate', rate: 310 * (rate[0].rate / 100)},
    {id: 1, title: 'Progressrate', rate: 310 * (rate[1].rate / 100)},
  ]);
  const project = route.params.project;
  console.log(project);
  function handleSubmit() {
    console.log('press');
    projectrefund({
      project_id: project.id,
    })
      .then((res) => {
        console.log(res);
        Alert.alert('보증금 환급 신청이 완료되었습니다.');
        navigation.navigate('Authentication');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.refundView}>
          <Text style={styles.projecttextStyle}> 보증금 환급받기</Text>
        </View>

        <View style={{margin: 20}}>
          <ImageBackground
            source={cat}
            style={styles.imgStyle}
            opacity={0.3}
            blurRadius={5}>
            <View style={{margin: 10}}>
              <Text style={styles.titleStyle}>
                {route.params.project.title}
              </Text>
              <Text style={styles.subStyle}>
                {route.params.project.description}
              </Text>
              <Text style={styles.dayStyle}>
                {route.params.project.experience_period} DAYS
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.textPosition}>
            <Text style={styles.textStyle}>
              프로젝트 인증 기한이 끝났습니다 !
            </Text>
            <Text style={styles.textStyle}>고생하셨습니다 👏</Text>
          </View>
          <View style={styles.percentView}>
            <View style={styles.precentPosition}>
              <Text style={styles.presentTextStyle}>현재 진행률</Text>
              <Text style={styles.percentStyle}>{rate[1].rate}%</Text>
            </View>

            <View style={styles.precentPosition}>
              <Text style={styles.authTextStyle}>인증 진행률</Text>
              <Text style={styles.percentStyle}>{rate[0].rate}%</Text>
            </View>
          </View>
          <View>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <View
                style={{
                  borderColor: colors.maincolor,
                  borderBottomWidth: 25,
                  borderRadius: 10,
                  width: ratebar[1].rate,
                }}></View>
              <Text style={styles.presentBarTextStyle}>{rate[1].rate}%</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <View
                style={{
                  borderColor: '#FF6464',
                  borderBottomWidth: 25,
                  borderRadius: 10,
                  width: ratebar[0].rate,
                }}></View>
              <Text style={styles.authBarTextStyle}>{rate[0].rate}%</Text>
            </View>
          </View>
          <View style={styles.textPosition}>
            <Text style={styles.paytxtStyle}>
              환급 될 보증금은 3000원 입니다.
            </Text>
            <Button onPress={() => handleSubmit()}>보증금 환급 신청</Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  refundView: {
    borderColor: '#9FA5C0',
    borderBottomWidth: 2,
    width: '100%',
    marginBottom: '3%',
  },
  projecttextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E5481',
    right: '0%',
    margin: '5%',
    marginTop: '15%',
  },
  percentView: {
    flexDirection: 'row',
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  precentPosition: {
    flex: 1,
    margin: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  presentTextStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.maincolor,
    marginBottom: '20%',
  },
  authTextStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FF6464',
    marginBottom: '20%',
  },
  percentStyle: {
    fontWeight: 'bold',
    color: '#9FA5C0',
    fontSize: 20,
  },
  presentBarTextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.maincolor,
    marginLeft: 10,
  },
  authBarTextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FF6464',
    marginLeft: 10,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textPosition: {
    marginTop: 30,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paytxtStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.maincolor,
    marginBottom: 30,
  },
  imgStyle: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
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
    marginLeft: 5,
  },
  dayStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#2E3E5C',
    marginLeft: 5,
  },
});

export default AuthPay;
