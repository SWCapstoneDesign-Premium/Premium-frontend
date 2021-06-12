import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../src/colors';
function GroupsItem({item}) {
  console.log(item);
  return (
    <View style={styles.container}>
      <Icon name="wechat" color={colors.subcolor2} size={40} />
      <View style={styles.groupNAmeView}>
        <Text style={styles.groupTitle}>{item.groupName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 15,
    backgroundColor: colors.subcolor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
  },
  groupNAmeView: {
    justifyContent: 'center',
    height: 60,
    paddingHorizontal: 5,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  groupMembers: {
    fontSize: 14,
  },
});

export default GroupsItem;
