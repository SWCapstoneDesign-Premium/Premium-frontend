import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from '../Screen/Onboarding';
import AuthLoading from '../Screen/AuthLoadingScreen';
import Signin from '../Screen/SigninScreen';
import Signup from '../Screen/SignUpScreen';
import Tabnavigation from './BottomTabNav';
import AdditionalInfo from '../Screen/AdditionalInfo';
import KakaoLogin from '../Screen/KakaoLogin/KakaoLogin';
import KakaoAdditionalInfo from '../Screen/KakaoLogin/KakaoAdditionalInfo';
import CheckUserData from '../Screen/KakaoLogin/CheckUserData';
import CheckUser from '../Screen/CheckUser';
const Stack = createStackNavigator();

export default function StackForLogin() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdditionalInfo"
        component={AdditionalInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckUser"
        component={CheckUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthLoading"
        component={AuthLoading}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={Tabnavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="KakaoLogin"
        component={KakaoLogin}
        options={{headerTitle: '카카오 로그인'}}
      />
      <Stack.Screen
        name="KakaoAdditionalInfo"
        component={KakaoAdditionalInfo}
        options={{headerTitle: '추가 정보 기입'}}
      />
      <Stack.Screen
        name="CheckUserData"
        component={CheckUserData}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
