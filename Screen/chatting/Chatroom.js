import React, {useState, useEffect, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import GroupsItem from './GroupItem';
import {getcurrentuser, getattendances, tutorgetproject} from '../../src/Api';

const Chatroom = (props) => {
  const myinfo = useRef();
  const latestpr = useRef();
  const [groups, setGroups] = useState([]);
  console.log('--------------------------------------');
  console.log(myinfo);
  console.log(latestpr);
  console.log('--------------------------------------');
  useEffect(() => {
    props.navigation.addListener('focus', (e) => {
      getcurrentuser()
        .then((res) => {
          myinfo.current = res.data;
          if (res.data.type === 'Tutee') {
            getattendances()
              .then((res) => {
                console.log(res.data);
                latestpr.current = res.data;
                getChats(latestpr.current, myinfo.current);
              })
              .catch((e) => {
                console.log(
                  '-----------------get attendance error----------------',
                );
                console.log(e);
              });
          } else {
            tutorgetproject({
              q: {tutor_id_eq: res.data.id},
            })
              .then((res) => {
                console.log('tutor get project list complete');
                latestpr.current = res.data;
                getChats(latestpr.current, myinfo.current);
              })
              .catch((e) => {
                console.log('=======get tutor project error========');
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
          alert('get user info error!!');
        });
    });
  }, []);

  function getChats(latestpr, myinfo) {
    const db = firestore();
    var groupArray = [];
    console.log('====================');
    console.log(latestpr);
    console.log('====================');

    db.collection('GROUPS')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          groupArray.push(doc.data());
        });
        groupArray = groupArray.filter((group) => {
          var check = 0;
          latestpr.map((pr) => {
            if (myinfo.type === 'Tutee') {
              if (pr.project.id === group.projectID) {
                check = 1;
              }
            } else {
              if (pr.id === group.projectID) {
                check = 1;
              }
            }
          });
          return check === 1;
        });
        console.log(groupArray);
        setGroups(groupArray);
      });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Message', {
                  item: item,
                  myinfo: myinfo.current,
                  latestpr,
                });
              }}>
              <GroupsItem item={item} />
            </TouchableOpacity>
          </View>
        )}
        style={{width: '90%'}}
      />
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
export default Chatroom;
