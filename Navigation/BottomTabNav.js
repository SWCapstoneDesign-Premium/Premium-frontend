import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from '../Navigation/SearchNavigation';
import createProjectStackNav from './CreateProjectStackNav';
import ProjectNavi from './ProjectNavigation';
import AuthNamvi from './AuthNavigation';
import ChattingNavi from './ChattingNavi';
const TabNavigator = createBottomTabNavigator();

export default function Tabnavigation() {
  return (
    <TabNavigator.Navigator initialRouteName="Home">
      <TabNavigator.Screen
        name="Home"
        component={ProjectNavi}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: '검색',
          tabBarIcon: ({color}) => (
            <Ionicons name="search" color={color} size={26} />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Authentication"
        component={AuthNamvi}
        options={{
          tabBarLabel: '인증',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="checkbox-marked-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Chatting"
        component={ChattingNavi}
        options={{
          tabBarLabel: '채팅',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="chat-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Profile"
        component={createProjectStackNav}
        options={{
          tabBarLabel: '프로필',
          tabBarIcon: ({color}) => (
            <Ionicons name="person" color={color} size={26} />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
}
