import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Chatroom from '../Screen/chatting/Chatroom';
import Message from '../Screen/chatting/Message';
const StackForChat = createStackNavigator();

export default function ChattingStackNav() {
  return (
    <StackForChat.Navigator initialRouteName="Chatroom">
      <StackForChat.Screen
        name="Chatroom"
        component={Chatroom}
        options={{headerTitle: '프로젝트 채팅방'}}
      />
      <StackForChat.Screen
        name="Message"
        component={Message}
        options={({route}) => ({title: route.params.item.groupName})}
      />
    </StackForChat.Navigator>
  );
}
