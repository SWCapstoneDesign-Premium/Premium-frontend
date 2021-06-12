import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';

import {Button} from '../../src/components/Button';
import Imagepicker from '../../src/image-picker';
import {submitauth} from '../../src/Api';
import LoadingModal from '../../src/components/LoadingModal';
import {CurrentUser} from '../../src/utils/CurrentUser';

const SchoolAuth = (props) => {
  const [myinfo, setMyinfo] = useContext(CurrentUser);
  const [imageinfo, setImageinfo] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (myinfo.status === 'approving') {
      Alert.alert(
        '이미 사진을 제출하셨습니다.',
        '관리자 승인이 반려되셨을 경우 다시 제출이 가능합니다!',
        [
          {
            text: '확인',
            onPress: () => {
              props.navigation.goBack();
            },
          },
        ],
      );
    }
  }, []);

  const submitPhoto = () => {
    if (imageinfo !== undefined) {
      const formData = new FormData();
      formData.append('auth[images_attributes][0][image]', {
        uri: imageinfo.uri,
        name: imageinfo.fileName,
        type: imageinfo.type,
      });
      setModalVisible(true);
      submitauth(formData)
        .then((res) => {
          console.log(res);
          setModalVisible(false);
          Alert.alert('', '제출이 완료되었습니다!', [
            {
              text: '확인',
              onPress: () => {
                console.log('확인 누름');
                props.navigation.goBack();
              },
            },
          ]);
        })
        .catch((error) => console.log(error.response.data));
      console.log('사진제출!!');
    } else {
      alert('제출하실 사진을 선택해주세요!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ImagepickerStyle}>
        <Text style={styles.info}>
          따:숲은 튜터인증을 위해 학교 인증을 진행 하고있습니다. 학교 인증을
          위해 학생증과 함께 자신의 모습이 나오게 사진을 찍어 전송해주세요
        </Text>
        <Imagepicker getImage={setImageinfo} defaultimage={''} />
      </View>
      <View styles={styles.confirm}>
        <Button onPress={submitPhoto}>사진 제출</Button>
      </View>
      <LoadingModal visible={modalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  ImagepickerStyle: {
    flex: 1,
  },
  info: {
    margin: 10,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default SchoolAuth;
