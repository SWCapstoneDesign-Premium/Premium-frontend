import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const DeleteChatRoom = (props) => {
  const {myinfo, latestpr, chatroom} = props.route.params;

  useEffect(() => {
    const unsubdelete = deletegroup();
    return () => {
      unsubdelete;
    };
  }, []);

  function deletegroup() {
    console.log(chatroom.groupID);
    const memberRef = firestore()
      .collection('members')
      .doc(chatroom.groupID)
      .collection('member');
    const messageRef = firestore()
      .collection('message')
      .doc(chatroom.groupID)
      .collection('messages');
    const groupRef = firestore().collection('GROUPS').doc(chatroom.groupID);
    memberRef
      .get()
      .then((res) => {
        res.forEach((r) => {
          console.log(r.id);
          memberRef.doc(r.id).delete();
        });
      })
      .catch((e) => console.log(e));
    messageRef
      .get()
      .then((res) => {
        res.forEach((r) => {
          console.log(r.id);
          messageRef.doc(r.id).delete();
        });
      })
      .catch((e) => console.log(e));
    groupRef
      .delete()
      .then((res) => {
        alert(latestpr.title + ' 채팅방' + ' 삭제가 완료되었습니다.');
        props.navigation.popToTop();
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
export default DeleteChatRoom;
