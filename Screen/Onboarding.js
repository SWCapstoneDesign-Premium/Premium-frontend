import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import jwt_decode from 'jwt-decode';
import {Button} from '../src/components';
import {refresh, logout} from '../src/Api';
import {setToken} from '../src/Asyncstorage';
import RNRestart from 'react-native-restart';
import {StyleSheet, View, Image} from 'react-native';
import icon from '../assets/icon2.png';

const Onboarding = (props) => {
  const deletokenfortest = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log('토큰 삭제 실패: ' + error.message);
    }
  };
  const Timer_set = (decode_token_ToNumber, now_time) => {
    setTimeout(
      onSilentRefresh,
      (decode_token_ToNumber - now_time - 120) * 1000,
    );
  };

  const onSilentRefresh = () => {
    refresh()
      .then((res) => {
        deletokenfortest();
        setToken(res.data.token);
        let decode_token = jwt_decode(res.data.token);
        let decode_token_ToNumber = Number(decode_token.exp);
        let now_time = new Date().getTime() / 1000;
        now_time = Math.ceil(now_time);
        Timer_set(decode_token_ToNumber, now_time);
      })
      .catch(async (error) => {
        alert('로그인 만료시간이 다되었습니다. 다시 로그인해주세요');
        console.log(error);
        deletokenfortest();
        RNRestart.Restart();
      });
  };

  const CheckUserToken = async () => {
    try {
      const item = await AsyncStorage.getItem('token');
      console.log('여긴 try');
      if (item) {
        console.log('token in authloading (in item true) : ' + item);
        let decode_token = jwt_decode(item);
        let decode_token_ToNumber = Number(decode_token.exp);
        console.log('decode_token: ' + JSON.stringify(decode_token));
        console.log('decode_token1: ' + decode_token_ToNumber);

        let now_time = new Date().getTime() / 1000;
        console.log('now_time: ', now_time);

        if (decode_token_ToNumber - now_time < 0) {
          console.log('여기는 엑세스토큰이 초과됐을때');
          onSilentRefresh();
        } else {
          console.log('여기는 엑세스토큰이 초과안됐을때');
          Timer_set(decode_token_ToNumber, now_time);
        }
      }
    } catch (error) {
      console.log('토큰체크 실패: ' + error.message);
    }
  };
  useEffect(() => {
    CheckUserToken();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textposition}>
        <Image source={icon} style={styles.iconstyle}></Image>
      </View>
      <Button
        onPress={() => {
          props.navigation.navigate('AuthLoading');
        }}>
        Get Started
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textposition: {
    flexDirection: 'row',
    height: 500,
    marginTop: 0,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  iconstyle: {
    width: '90%',
    height: '90%',
  },
});

export default Onboarding;
