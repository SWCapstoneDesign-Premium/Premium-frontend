import React, {useEffect, useContext} from 'react';
//import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {getcurrentuser} from '../src/Api';
import {CurrentUser} from '../src/utils/CurrentUser';

const AuthLoading = (props) => {
  const [currentuser, setCurrentUser] = useContext(CurrentUser);
  const deletokenfortest = async () => {
    //asyncstorage 테스트용 token 삭제
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log('AsyncStorage remove Error: ' + error.message);
    }
  };

  const CheckUserToken = async (props) => {
    try {
      const item = await AsyncStorage.getItem('token');
      console.log('token in authloading : ' + item);
      if (item) {
        console.log('there is token');
        getcurrentuser()
          .then((res) => {
            console.log(res.data);
            setCurrentUser(res.data);
            props.navigation.replace('Main');
          })
          .catch((e) => {
            console.log('setCurrentUser', e);
          });
        console.log('Go to Main');
      } else {
        props.navigation.replace('Signin');
        console.log('Go to Signin');
      }
    } catch (error) {
      console.log('AsyncStorage Error!!!!!!!: ' + error.message);
    }
  };
  useEffect(() => {
    //    deletokenfortest();
    CheckUserToken(props);
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AuthLoading;
