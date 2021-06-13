import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import colors from '../colors';
import ProjectMini from '../../src/components/ProjectMini';

export const EachTabViewsProjects = (props) => {
  return (
    <ScrollView style={styles.scrollmenuWrapper}>
      <View style={styles.menuWrapper}>
        {props.project.map((pr, index) => {
          if (props.usertype === 'Tutor') {
            return (
              <View key={index} style={{marginVertical: 8}}>
                <ProjectMini
                  navigation={props.navigation}
                  project={pr}
                  key={index}
                />
              </View>
            );
          } else {
            return (
              <View key={index} style={{marginVertical: 8}}>
                <ProjectMini
                  navigation={props.navigation}
                  project={pr.project}
                  key={index}
                />
              </View>
            );
          }
        })}
      </View>
    </ScrollView>
  );
};

export const renderTabBar = (props) => {
  return (
    <TabBar
      {...props}
      activeColor={colors.maincolor}
      inactiveColor={'black'}
      style={{backgroundColor: ''}}
      indicatorStyle={{backgroundColor: colors.maincolor}}
    />
  );
};

const styles = StyleSheet.create({
  scrollmenuWrapper: {
    padding: 10,
    width: '100%',
    marginTop: 5,
  },
  menuWrapper: {
    marginRight: -20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
