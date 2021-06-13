import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../Screen/Main/Search';
import Projectcard from '../src/components/Projectcard';
import ProjectDetail from '../src/components/ProjectDetail';
import ProjectTrial from '../src/components/ProjectTrial';
import ProfileView from '../src/components/ProfileView';
import ProjectMini from '../src/components/ProjectMini';
import CardNews from '../src/components/CardNews';
const Stack = createStackNavigator();

export default function ProjectNavigation() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Projectcard"
        component={Projectcard}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
      <Stack.Screen name="ProfileView" component={ProfileView} />
      <Stack.Screen
        name="ProjectMini"
        component={ProjectMini}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProjectTrial"
        component={ProjectTrial}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CardNews"
        component={CardNews}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
