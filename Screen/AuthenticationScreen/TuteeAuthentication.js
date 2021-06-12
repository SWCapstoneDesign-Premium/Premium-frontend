import React, {useState} from 'react';
import colors from '../../src/colors';
import {Button} from '../../src/components';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TextInput,
  Keyboard,
  Alert,
  useWindowDimensions,
} from 'react-native';
import {PickMultipleFile} from '../../src/DocumentPicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {submitauth} from '../../src/Api';
import LoadingModal from '../../src/components/LoadingModal';
const TuteeAuthentication = ({navigation, route}) => {
  // console.log(route.params.project)
  const {width} = useWindowDimensions();
  const [files, setFiles] = useState([]);
  const [text, setText] = useState('');
  const [fin, setFin] = useState(false);
  const [project, setProject] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const savePickedFiles = async () => {
    console.log('pick file');
    const pickedfiles = await PickMultipleFile();
    if (pickedfiles != null) {
      console.log(files);
      setFiles((files) => files.concat(pickedfiles));
    }
  };
  const deleteFiles = (key) => {
    console.log('----------------------------');
    setFiles(files.filter((f, idx) => idx !== key));
    console.log(files.name);
    console.log('----------------------------');
  };
  const renderimagepopup = (key) => {
    console.log('show image');
    console.log(key);
    navigation.navigate('TuteeAuthPopUp', {imagesource: files[key].uri});
  };
  const handleSubmitAuthenticatoin = () => {
    Keyboard.dismiss();
    const formData = new FormData();
    formData.append('description', text);
    files.map((file, index) => {
      formData.append(`auth[images_attributes][${index}][image]`, {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });
    });
    formData.append('project_id', route.params.project.id);
    console.log(formData);
    if (files.length !== 0) {
      setModalVisible(true);
      submitauth(formData)
        .then((res) => {
          console.log(res);
          setModalVisible(false);
          Alert.alert('', '제출이 완료되었습니다!', [
            {
              text: 'OK',
              onPress: () => {
                console.log('확인 누름');
                navigation.goBack();
              },
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('제출하실 사진을 선택해주세요!');
    }
  };
  function RenderPickedFiles({pickedfiles}) {
    console.log('selected files : ' + JSON.stringify(files));
    return (
      <ScrollView>
        <View style={{width: width * 0.9}}>
          {pickedfiles.map((file, key) => {
            return (
              <View
                key={key}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 8,
                  padding: 5,
                  backgroundColor: 'white',
                }}>
                <Icon
                  name="file-upload-outline"
                  color={colors.subcolor2}
                  size={20}
                />
                <View
                  style={{
                    width: '75%',
                    padding: 5,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => renderimagepopup(key)}>
                    <Text name={file.name} style={{fontSize: 15}}>
                      파일명: {file.name}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      deleteFiles(key);
                    }}>
                    <Icon
                      name="file-excel-box"
                      color={colors.maincolor}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.InputStyle}>
        <TextInput
          placeholder="인증할 내용을 입력해주세요."
          onChangeText={(value) => setText(value)}
          onBlur={() => Keyboard.dismiss()}
          value={text}
          blurOnSubmit={true}
          multiline={true}
        />
      </View>
      <View style={{margin: 5}}>
        <Button
          onPress={async () => {
            Keyboard.dismiss();
            await savePickedFiles();
          }}>
          <Text>파일 선택</Text>
        </Button>
      </View>
      <RenderPickedFiles pickedfiles={files} />
      <View style={{margin: 10}}>
        {fin ? (
          <View>
            {project[0].experience ? (
              <View>
                <Text
                  style={{marginBottom: 30, fontWeight: 'bold', fontSize: 17}}>
                  이 프로젝트는 체험 기간이 완료된 프로젝트 입니다.
                </Text>
                <Button
                  onPress={() => {
                    navigation.push('ProjectDetail', {project});
                  }}>
                  <Text>프로젝트 신청하기</Text>
                </Button>
              </View>
            ) : (
              <View>
                <Text
                  style={{marginBottom: 30, fontWeight: 'bold', fontSize: 17}}>
                  이 프로젝트는 인증 기간이 완료된 프로젝트 입니다.
                </Text>
                <Button
                  onPress={() => {
                    navigation.push('AuthPayBack', {project});
                  }}>
                  <Text>보증금 환급 받기!</Text>
                </Button>
              </View>
            )}
          </View>
        ) : (
          <Button onPress={handleSubmitAuthenticatoin}>
            <Text>인증 제출</Text>
          </Button>
        )}
      </View>
      <LoadingModal visible={modalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  textposition: {
    marginTop: 70,
    marginLeft: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  pickerstyle: {
    width: '90%',
    marginTop: '1%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingRight: 30,
    color: 'black',
  },
  textStyle: {
    textAlign: 'center',
    padding: 10,
    fontSize: 15,
    color: 'black',
  },
  InputStyle: {
    width: '90%',
    height: '30%',
    margin: 10,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },

  cancelText: {
    fontWeight: 'bold',
  },
});

export default TuteeAuthentication;
