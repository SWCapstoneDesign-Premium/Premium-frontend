import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, DestroyButton} from '../components/Button';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import RNRestart from 'react-native-restart';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {userUpdate, logout, userdestroy} from '../Api';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('이메일을 입력해주세요.')
    .email('이메일 형식이 아닙니다.'),
  password: Yup.string().required('비밀번호를 입력해주세요.'),
  Comfirm_password: Yup.string()
    .required('비밀번호 확인을 입력해주세요.')
    .oneOf([Yup.ref('password')], '비밀번호가 다릅니다.'),
  Name: Yup.string().required('이름을 입력해주세요.'),
  Phone: Yup.number()
    .typeError('슷지만 입력해주세요.')
    .min(11)
    .required('핸드폰 번호를 입력해주세요.'),
});

const Modifyprofile = (props) => {
  const {myinfo, project} = props.route.params;
  const handleSubmitPress = (values) => {
    console.log(props.route.params.myinfo.id);
    userUpdate(props.route.params.myinfo.id, {
      user: {
        email: values.email,
        password: values.password,
        name: values.Name,
        phone: values.Phone,
      },
    })
      .then((res) => {
        console.log(res.data);
        logout().then(async () => {
          console.log('로그아웃 성공');
          await AsyncStorage.removeItem('token');
          RNRestart.Restart();
          alert('개인 정보 수정 성공');
        });
      })
      .catch((error) => {
        alert('전화번호가 있습니다.');
        console.log(error);
      });
  };
  const usersecession = () => {
    console.log('회원탈퇴');
    if (project.length >= 1) {
      alert('참여하신 프로젝트가 있어 탈퇴가 불가능합니다.');
    } else {
      Alert.alert('회원탈퇴', '정말 회원탈퇴를 진행하시겠습니까?', [
        {
          text: '확인',
          onPress: () => {
            console.log('탈퇴진행중');
            userdestroy(myinfo.id)
              .then((res) => {
                console.log(res.data);
                logout()
                  .then(async () => {
                    console.log('로그아웃 성공');
                    await AsyncStorage.removeItem('token');
                    alert('회원 탈퇴 성공');
                    RNRestart.Restart();
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              })
              .catch((e) => {
                console.log(e);
              });
          },
        },
        {
          text: '취소',
          onPress: () => {},
        },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        style={styles.FormStyle}
        validationSchema={validationSchema}
        initialValues={{
          email: myinfo.email,
          password: '',
          Comfirm_password: '',
          Name: myinfo.name,
          Phone: myinfo.phone.replace(/-/gi, ''),
        }}
        onSubmit={(values) => {
          console.log(values);
          handleSubmitPress(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          console.log(values),
          (
            <>
              <ScrollView>
                <TextInput
                  name="email"
                  placeholder="        이메일"
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <TextInput
                  name="Name"
                  placeholder="        이름"
                  style={styles.textInput}
                  onChangeText={handleChange('Name')}
                  onBlur={handleBlur('Name')}
                  value={values.Name}
                />
                {errors.Name && touched.Name && (
                  <Text style={styles.errorText}>{errors.Name}</Text>
                )}

                <TextInput
                  name="password"
                  placeholder="        비밀번호"
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TextInput
                  name="Confirm_password"
                  placeholder="        비밀번호 확인"
                  style={styles.textInput}
                  onChangeText={handleChange('Comfirm_password')}
                  onBlur={handleBlur('Comfirm_password')}
                  value={values.Comfirm_password}
                  secureTextEntry
                />
                {errors.Comfirm_password && touched.Comfirm_password && (
                  <Text style={styles.errorText}>
                    {errors.Comfirm_password}
                  </Text>
                )}

                <TextInput
                  name="Phone"
                  placeholder="        전화번호 '-' 없이 입력         "
                  style={styles.textInput}
                  onChangeText={handleChange('Phone')}
                  onBlur={handleBlur('Phone')}
                  value={values.Phone}
                />
                {errors.Phone && touched.Phone && (
                  <Text style={styles.errorText}>{errors.Phone}</Text>
                )}
              </ScrollView>
              <View style={styles.Button}>
                <Button onPress={handleSubmit}>개인 정보 수정 완료</Button>
              </View>
              <View style={styles.Button}>
                <DestroyButton onPress={usersecession}>회원 탈퇴</DestroyButton>
              </View>
            </>
          )
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  FormStyle: {
    height: 40,
    marginTop: 20,
    margin: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'center',
  },
  textInput: {
    height: 50,
    width: 350,
    margin: 20,
    backgroundColor: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    elevation: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 20,
  },

  Button: {
    alignSelf: 'center',
    marginBottom: 30,
  },
});

export default Modifyprofile;
