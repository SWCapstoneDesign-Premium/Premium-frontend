import React, {useState} from 'react';
import colors from '../../src/colors';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../../src/components';
import {tuteeauthconfirm} from '../../src/Api';

const TutorAuthCheck = ({navigation, route}) => {
  const {tutee, project} = route.params;
  const [submittedfiles, setSubmittedfiles] = useState(tutee.images);
  const {width} = useWindowDimensions();
  console.log('===================================');
  console.log(tutee.id);
  console.log(tutee.target.id);
  console.log(project.id);
  console.log(tutee);
  console.log('===================================');
  const renderimagepopup = (key) => {
    console.log('show image');
    navigation.navigate('TuteeAuthPopUp', {
      imagesource: submittedfiles[key].image_url,
    });
  };

  function RenderSubmitFiles({pickedfiles}) {
    return (
      <ScrollView>
        <View style={{width: width * 0.8}}>
          {pickedfiles.map((file, key) => {
            return (
              <TouchableOpacity key={key} onPress={() => renderimagepopup(key)}>
                <View style={styles.buttonContainer}>
                  <Icons
                    name="file-upload-outline"
                    color={colors.subcolor2}
                    size={20}
                  />
                  <View style={styles.fileView}>
                    <Text name={key} style={{fontSize: 15}}>
                      {key + 1} 번째 파일
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
  function confirmauth() {
    tuteeauthconfirm(tutee.id, {
      project_id: project.id,
      tutee_id: tutee.target.id,
      auth: {
        status: 'confirm',
      },
    })
      .then((res) => {
        console.log(res);
        Alert.alert('', '인증 확인이 완료되었습니다!', [
          {
            text: 'OK',
            onPress: () => {
              console.log('확인 누름');
              navigation.pop();
            },
          },
        ]);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.tuteeBarStyle}>
        <Icons name="face" size={30}></Icons>
        <Text style={styles.tuteenameStyle}>{tutee.target.name}</Text>
      </View>
      <View style={styles.tuteeBarStyle}>
        <Text style={styles.textStyle}>제출한 인증 👍</Text>
      </View>
      <View style={styles.fileboxStyle}>
        <RenderSubmitFiles pickedfiles={submittedfiles} />
      </View>
      <Button onPress={confirmauth}>{tutee.target.name} 님 인증 확인 ✌️</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    margin: '0%',
    marginTop: '5%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    padding: 5,
    backgroundColor: 'white',
  },
  fileView: {
    width: '75%',
    padding: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  tuteeBarStyle: {
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    margin: '3%',
  },
  tuteenameStyle: {
    marginLeft: '5%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3E5481',
  },
  fileboxStyle: {
    backgroundColor: '#D0DBEA',
    width: '90%',
    height: '50%',
    marginBottom: '30%',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default TutorAuthCheck;
