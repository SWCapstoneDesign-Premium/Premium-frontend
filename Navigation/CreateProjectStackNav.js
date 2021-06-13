import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProjectForm from '../Screen/makeProjectScreen/ProjectForm';
import Profile from '../Screen/Main/Profile';
import AuthNamvi from './AuthNavigation';
import SchoolAuth from '../Screen/SchoolAuth/SchoolAuth';
import Projectcard from '../src/components/Projectcard';
import ProjectDetail from '../src/components/ProjectDetail';
import ProjectTrial from '../src/components/ProjectTrial';
import ProfileView from '../src/components/ProfileView';
import ProjectMini from '../src/components/ProjectMini';
import CardNews from '../src/components/CardNews';
import Book from '../Screen/makeProjectScreen/Book';
import Chapter from '../Screen/makeProjectScreen/Chapter';
import CreateChatRoom from '../Screen/chatting/CreateChatRoom';
import DeleteChatRoom from '../Screen/chatting/DeleteChatRoom';
import UpdateProject from '../Screen/UpdateProject/UpdateProject';
import Modifyprofile from '../src/components/Modifyprofile';
import UserProfileUpload from '../src/components/UserProfileUpload';
import MyLike from '../src/components/MyLike';
const StackForCreatePrj = createStackNavigator();

export default function createProjectStackNav() {
  return (
    <StackForCreatePrj.Navigator initialRouteName="Profile">
      <StackForCreatePrj.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <StackForCreatePrj.Screen
        name="ProjectForm"
        component={ProjectForm}
        options={{
          title: '프로젝트 생성',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForCreatePrj.Screen
        name="Book"
        component={Book}
        options={{
          headerTitle: '책 선택',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForCreatePrj.Screen
        name="Chapter"
        component={Chapter}
        options={{
          headerTitle: '챕터 가중치 설정',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForCreatePrj.Screen
        name="SchoolAuth"
        component={SchoolAuth}
        options={{
          headerTitle: '학교 인증',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForCreatePrj.Screen
        name="Projectcard"
        component={Projectcard}
        options={{headerShown: false}}
      />
      <StackForCreatePrj.Screen
        name="ProjectDetail"
        component={ProjectDetail}
        options={{
          headerTitle: '프로젝트 상세보기',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForCreatePrj.Screen
        name="ProfileView"
        component={ProfileView}
        options={{
          headerTitle: '튜터 프로필',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForCreatePrj.Screen
        name="ProjectMini"
        component={ProjectMini}
        options={{headerShown: false}}
      />
      <StackForCreatePrj.Screen
        name="ProjectTrial"
        component={ProjectTrial}
        options={{headerShown: false}}
      />
      <StackForCreatePrj.Screen
        name="CardNews"
        component={CardNews}
        options={{headerShown: false}}
      />
      <StackForCreatePrj.Screen
        name="CreateChatRoom"
        component={CreateChatRoom}
        options={{headerShown: false}}
      />
      <StackForCreatePrj.Screen
        name="DeleteChatRoom"
        component={DeleteChatRoom}
        options={{headerShown: false}}
      />
      <StackForCreatePrj.Screen
        name="UpdateProject"
        component={UpdateProject}
        options={{
          headerTitle: '프로젝트 업데이트',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForCreatePrj.Screen
        name="MyLike"
        component={MyLike}
        options={{
          headerTitle: '좋아요 리스트',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForCreatePrj.Screen
        name="Modifyprofile"
        component={Modifyprofile}
        options={{
          headerTitle: '개인 정보 수정',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <StackForCreatePrj.Screen
        name="UserProfileUpload"
        component={UserProfileUpload}
        options={{
          headerTitle: '프로필 사진 업로드',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
    </StackForCreatePrj.Navigator>
  );
}
