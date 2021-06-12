import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Authentication from '../Screen/Main/Authentication';
import TutorAuthentication from '../Screen/AuthenticationScreen/TutorAuthentication';
import TutorAuthCheck from '../Screen/AuthenticationScreen/TutorAuthCheck';
import TuteeAuthentication from '../Screen/AuthenticationScreen/TuteeAuthentication';
import AuthPayBack from '../Screen/AuthenticationScreen/AuthPayBack';
import ProjectDetail from '../src/components/ProjectDetail';
import TuteeAuthList from '../Screen/AuthenticationScreen/TuteeAuthList';
import TutorAuthList from '../Screen/AuthenticationScreen/TutorAuthList';
import TuteeAuthdetail from '../Screen/AuthenticationScreen/TuteeAuthdetail';
import ExperienceAuth from '../Screen/AuthenticationScreen/ExperiencedAuth';
import TuteeAuthPopUp from '../Screen/AuthenticationScreen/TuteeAuthPopUp';
import App from '../Screen/PaymentScreens/index';

const StackForAuth = createStackNavigator();

export default function createProjectStackNav() {
  return (
    <StackForAuth.Navigator initialRouteName="Authentication">
      <StackForAuth.Screen
        name="Authentication"
        component={Authentication}
        options={{headerShown: false}}
      />
      <StackForAuth.Screen
        name="TutorAuthentication"
        component={TutorAuthentication}
        options={{
          headerTitle: '프로젝트 인증',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForAuth.Screen
        name="TutorAuthCheck"
        component={TutorAuthCheck}
        options={{
          headerTitle: '튜티 인증 내용',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForAuth.Screen
        name="TuteeAuthentication"
        component={TuteeAuthentication}
        options={{
          headerTitle: '프로젝트 인증',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForAuth.Screen
        name="AuthPayBack"
        component={AuthPayBack}
        options={{headerShown: false}}
      />
      <StackForAuth.Screen
        name="ProjectDetail"
        component={ProjectDetail}
        options={{
          headerTitle: '프로젝트 상세보기',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForAuth.Screen name="TuteeAuthList" component={TuteeAuthList} />
      <StackForAuth.Screen name="TutorAuthList" component={TutorAuthList} />
      <StackForAuth.Screen
        name="TuteeAuthdetail"
        component={TuteeAuthdetail}
        options={{
          headerTitle: '오늘의 인증',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForAuth.Screen
        name="ExperienceAuth"
        component={ExperienceAuth}
        options={{headerShown: false}}
      />
      <StackForAuth.Screen
        name="TuteeAuthPopUp"
        component={TuteeAuthPopUp}
        options={{headerShown: false}}
      />
      <StackForAuth.Screen
        name="PaymentPage"
        component={App}
        options={{headerShown: false}}
      />
    </StackForAuth.Navigator>
  );
}
