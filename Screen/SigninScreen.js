/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import React, {useEffect} from 'react';
import {Button, KakaoButton} from '../src/components';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import {login, appleLogin} from '../src/Api';
import {
  setToken,
  setType,
  setStatus,
  setName,
  setUser,
} from '../src/Asyncstorage';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {refresh, logout} from '../src/Api';
import icon from '../assets/ddasup_icon.png';
import jwtDecode from 'jwt-decode';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('이메일을 입력해주세요.')
    .email('이메일 형식이 아닙니다.'),
  password: Yup.string().required('비밀번호를 입력해주세요'),
});

const Signin = (props) => {
  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    if (appleAuth.isSupported) {
      return appleAuth.onCredentialRevoked(async () => {
        console.warn(
          'If this function executes, User Credentials have been Revoked',
        );
      });
    }
  }, []);
  async function onAppleButtonPress() {
    try {
      console.log('apple login');
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        console.log(appleAuthRequestResponse);
        const {
          identityToken,
          email,
          user,
          realUserStatus,
          fullName,
        } = appleAuthRequestResponse;
        var user_name = fullName.familyName + fullName.givenName;
        if (realUserStatus === 1) {
          console.log('login success');
          appleLogin(appleAuthRequestResponse)
            .then((res) => {
              console.log(res.data.token);
              setToken(res.data.token);
              props.navigation.replace('CheckUser');
            })
            .catch((err) => console.log(err));
        } else {
          console.log('register success');
          appleLogin(appleAuthRequestResponse)
            .then((res) => {
              console.log(res.data.token);
              setToken(res.data.token);
              props.navigation.navigate('AdditionalInfo', {
                name: user_name,
                userID: res.data,
              });
            })
            .catch((err) => console.log(err));
        }
      }
    } catch {
      console.log('Apple Login 진행 실패');
    }
  }
  const handleSubmitPress = (values) => {
    login({
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        onLoinSuccess(res);
      })
      .then(() => {
        props.navigation.replace('AuthLoading');
        console.log('Go to Home from sign in ');
      })
      .catch((error) => {
        alert('이메일 혹은 패스워드를 확인해주세요.');
        console.log(error);
      });
    const onLoinSuccess = (res) => {
      let decode_token = jwt_decode(res.data.token);
      let decode_token_ToNumber = Number(decode_token.exp);
      let now_time = new Date().getTime() / 1000;
      now_time = Math.ceil(now_time);
      setToken(res.data.token).then(console.log('토큰 저장 성공'));
      setType(res.data.type).then(console.log('타입 저장 성공'));
      setStatus(res.data.status).then(console.log('상태저장 성공'));
      setName(res.data.name).then(console.log('네임저장 성공'));
      setUser(res.data).then(console.log('데이터 저장성공'));
      setTIMEout(decode_token_ToNumber, now_time);
    };
    const setTIMEout = (decode_token_ToNumber, now_time) => {
      setTimeout(
        onSilentRefresh,
        (decode_token_ToNumber - now_time - 120) * 1000,
      );
    };
    const onSilentRefresh = () => {
      refresh()
        .then(async (res) => {
          await AsyncStorage.removeItem('token');
          console.log('리프레쉬');
          setToken(res.data.token);
          let decode_token = jwt_decode(res.data.token);
          let decode_token_ToNumber = Number(decode_token.exp);
          let now_time = new Date().getTime() / 1000;
          now_time = Math.ceil(now_time);
          setTIMEout(decode_token_ToNumber, now_time);
        })
        .catch(async (error) => {
          alert('로그인 만료시간이 다되었습니다. 다시 로그인해주세요');
          console.log(error);
          await AsyncStorage.removeItem('token');
          props.navigation.replace('Onboarding');
        });
    };
    const deletokenfortest = async () => {
      try {
        await AsyncStorage.removeItem('token');
        return true;
      } catch (error) {
        console.log('AsyncStorage remove Error: ' + error.message);
        return false;
      }
    };
  };

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.iconstyle} />
      <Formik
        style={styles.FormStyle}
        validationSchema={validationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={(values) => {
          console.log(values);
          handleSubmitPress(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              name="email"
              placeholder="     Email Address"
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              name="password"
              placeholder="     Password"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <View style={styles.button}>
              <Button onPress={handleSubmit}>Log in</Button>
            </View>
          </>
        )}
      </Formik>
      {appleAuth.isSupported ? (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            marginTop: 20,
            width: 180, // You must specify a width
            height: 45, // You must specify a height
          }}
          onPress={() => onAppleButtonPress()}
        />
      ) : null}
      <View style={styles.button}>
        <KakaoButton onPress={() => props.navigation.replace('KakaoLogin')} />
      </View>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text style={styles.SignUpQStyle}>따숲이 처음이신가요?</Text>
        <Text
          style={styles.SignUpStyle}
          onPress={() => props.navigation.navigate('Signup')}>
          Sign Up
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    width: '90%',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 'bold',
    elevation: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 20,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  FormStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  InputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  SignUpQStyle: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
    marginRight: 30,
  },
  SignUpStyle: {
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    borderBottomWidth: 1,
    paddingBottom: 1,
    marginTop: 10,
    borderBottomColor: 'blue',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'gray',
  },
  iconstyle: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
});

export default Signin;
