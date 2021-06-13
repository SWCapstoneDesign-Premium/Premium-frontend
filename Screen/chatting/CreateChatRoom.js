import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const CreateChatRoom = (props) => {
  const {myinfo, latestpr} = props.route.params;
  const roomName = latestpr.title + ' 채팅방 - ' + myinfo.name + ' 튜터';
  const groupsRef = firestore().collection('GROUPS');
  console.log('send firestore');
  console.log('------- groups ref --------');
  console.log(groupsRef);
  console.log('------- ---------- --------');

  groupsRef
    .add({
      groupID: latestpr.id,
      groupName: roomName,
      userID: myinfo.id,
      projectID: latestpr.id,
    })
    .then((docRef) => {
      console.log('-----------doc ref ----------');
      console.log(docRef._documentPath._parts[1]);
      console.log('-----------------------------');
      addMember(docRef._documentPath._parts[1], myinfo.id);
    })
    .catch((e) => {
      console.log(e);
    });

  function addMember(groupID, userID) {
    console.log(groupID);
    const membersRef = firestore()
      .collection('members')
      .doc(groupID)
      .collection('member');
    groupsRef
      .doc(groupID)
      .update({groupID: groupID})
      .then(() => {
        console.log('groupID update');
        membersRef
          .add({
            userID: userID,
          })
          .then(() => {
            alert(latestpr.title + ' 채팅방' + ' 개설이 완료되었습니다.');
            props.navigation.goBack();
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }
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
export default CreateChatRoom;
