import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import TuteeAuthList from '../AuthenticationScreen/TuteeAuthList';
import TutorAuthList from '../AuthenticationScreen/TutorAuthList';
import {getcurrentuser} from '../../src/Api';
const Authentication = ({navigation}) => {
  const [userType, setuserType] = useState('');
  const [type, setType] = useState('');
  useEffect(() => {
    async function getData() {
      await getcurrentuser()
        .then((res) => {
          setuserType(res.data.type);
        })
        .catch((err) => console.log('여긴 겟데이터 에러' + err));
    }
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.projectView}>
        <Text style={styles.projecttextStyle}>프로젝트 인증하기</Text>
      </View>
      {userType === '' ? null : userType === 'Tutor' ? (
        <TutorAuthList navigation={navigation} />
      ) : (
        <TuteeAuthList navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  projectView: {
    borderColor: '#9FA5C0',
    borderBottomWidth: 2,
    width: '100%',
    marginBottom: '5%',
  },
  projecttextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E5481',
    right: '0%',
    margin: '5%',
    marginTop: '15%',
  },
});

export default Authentication;
