import React, {useState, useEffect} from 'react';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {Alert, View, ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../../src/colors';
import {IconButton} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Messsage = (props) => {
  console.log('////////////////////////////////');
  console.log(props.route.params.myinfo);
  console.log('////////////////////////////////');
  const {myinfo, item, latestpr} = props.route.params;
  const [messages, setMessages] = useState([]);
  const [isJoin, setIsJoin] = useState(false);

  useEffect(() => {
    console.log('------------- item ---------------');
    console.log(latestpr.current);
    console.log('------------- ---- ---------------');
    if (myinfo.type === 'Tutee') {
      const project = latestpr.current.filter((pr) => {
        console.log(pr, item.projectID);
        return pr.project.id === item.projectID;
      });
      console.log('filtered project', project, item);
      if (
        project[0].pay_status === 'unpaid' &&
        project[0].project.status === 'running'
      ) {
        Alert.alert(
          '체험기간이 지났습니다.',
          '채팅방에 참여하시기 위해선 프로젝트 정식 참여를 위한 보증금 결제가 필요합니다.',
          [
            {
              text: '확인',
              onPress: () => {
                props.navigation.goBack();
              },
            },
          ],
        );
      } else {
        checkUser();
      }
    }

    const db = firestore();
    const unsubscribe = db
      .collection('message')
      .doc(item.groupID)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          })),
        ),
      );
    return unsubscribe;
  }, []);

  function checkUser() {
    console.log('check user');
    firestore()
      .collection('members')
      .doc(item.groupID)
      .collection('member')
      .where('userID', '==', myinfo.id)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            if (doc.data() != null) {
              setIsJoin(true);
            } else {
              setIsJoin(false);
              showAlertToJoin();
            }
          });
        } else {
          showAlertToJoin();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function joinGroup() {
    const groupMemberRef = firestore()
      .collection('members')
      .doc(item.groupID)
      .collection('member')
      .doc();
    groupMemberRef
      .set({
        userID: myinfo.id,
      })
      .then(() => {
        Alert.alert('환영합니다.');
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function showAlertToJoin() {
    Alert.alert('', '채팅방에 참가하시겠습니까?', [
      {
        text: 'yes',
        onPress: () => {
          joinGroup();
        },
      },
      {
        text: 'no',
        onPress: () => {
          props.navigation.goBack();
        },
      },
    ]);
  }

  function handleSend(newMessage = [], myinfo) {
    console.log(newMessage);
    const MessageRef = firestore()
      .collection('message')
      .doc(item.groupID)
      .collection('messages')
      .doc();
    setMessages(GiftedChat.append(messages, newMessage));
    const {_id, createdAt, text, user} = newMessage[0];
    MessageRef.set({
      _id,
      createdAt,
      text,
      user,
    })
      .then(() => {
        console.log('message from ', myinfo.id);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {backgroundColor: colors.maincolor},
          left: {backgroundColor: colors.subcolor},
        }}
        textStyle={{right: {color: '#fff'}, left: {color: 'rgba(0,0,0,0.7)'}}}
      />
    );
  }
  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.renderStyle}>
          <IconButton icon="send-circle" size={32} color={colors.subcolor2} />
        </View>
      </Send>
    );
  }
  function scrollToBottomComponent() {
    return (
      <View style={styles.renderStyle}>
        <IconButton
          icon="chevron-double-down"
          size={36}
          color="rgba(0,0,0,0.3)"
        />
      </View>
    );
  }
  function renderLoading() {
    return (
      <View style={styles.renderStyle}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage, myinfo)}
      user={{
        _id: myinfo.id,
        name: myinfo.name,
      }}
      placeholder={'메세지를 입력하세요'}
      isLoadingEarlier={true}
      renderBubble={renderBubble}
      alwaysShowSend={true}
      renderSend={renderSend}
      scrollToBottom={true}
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
      renderUsernameOnMessage={true}
    />
  );
};
const styles = StyleSheet.create({
  renderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Messsage;
