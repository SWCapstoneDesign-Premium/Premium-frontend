import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import colors from '../../src/colors';
import {Button} from '../../src/components';
import cat from '../../assets/cat2.png';
import App from '../PaymentScreens/index';
import ProgressBar from 'react-native-animated-progress';

const ExperienceAuth = ({navigation, route}) => {
  const [rate, setRate] = useState([
    {id: 0, title: 'Auhrate', rate: route.params.percent},
    {id: 1, title: 'Progressrate', rate: 100},
  ]);
  const [ratebar, setRatebar] = useState([
    {id: 0, title: 'Auhrate', rate: 310 * (rate[0].rate / 100)},
    {id: 1, title: 'Progressrate', rate: 310 * (rate[1].rate / 100)},
  ]);
  const project = route.params.project.project;
  function handleSubmit() {
    const project = route.params.project;
    console.log('프로젝트 신청', project);
    navigation.navigate('PaymentPage', {project});
  }
  console.log(route.params);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            borderColor: '#9FA5C0',
            borderBottomWidth: 2,
            width: '100%',
            marginBottom: '3%',
          }}>
          <Text style={styles.projecttextStyle}> 프로젝트 신청하기</Text>
        </View>

        <View style={{margin: 20}}>
          <ImageBackground
            source={cat}
            style={styles.imgStyle}
            opacity={0.3}
            blurRadius={5}>
            <View style={{margin: 10}}>
              <Text style={styles.titleStyle}>{project.title}</Text>
              <Text style={styles.subStyle}>{project.description}</Text>
              <Text style={styles.dayStyle}>
                {project.experience_period} DAYS
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.textPosition}>
            <Text style={styles.textStyle}>
              {project.experience_period} 일 체험 기한이 끝났습니다 !
            </Text>
            <Text style={styles.textStyle}>프로젝트에 참여해보세요 🙌</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: '5%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
            <View style={{marginLeft: 20, marginRight: 20}}>
              <ProgressBar
                progress={100}
                height={10}
                backgroundColor={colors.maincolor}
              />
            </View>
            <View style={{margin: 20}}>
              <ProgressBar
                progress={rate[0].rate}
                height={10}
                backgroundColor="#FF6464"
              />
            </View>
          </View>
          <View style={styles.textPosition}>
            <Button onPress={() => handleSubmit()}>프로젝트 시작하기</Button>
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
  projecttextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E5481',
    right: '0%',
    margin: '5%',
    marginTop: '15%',
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
    marginTop: 60,
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

export default ExperienceAuth;
