import React, {useState, useEffect} from 'react';
import {Button} from '../../src/components';
import colors from '../../src/colors';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {userUpdate} from '../../src/Api';
import {Formik} from 'formik';
import * as Yup from 'yup';
var phoneRegExp = /^\(?([0-1]{3})\)?[-]?([0-9]{4})[-]?([0-9]{4})$/;
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, '올바른 전화번호를 입력해주세요.')
    .required('전화번호를 입력해주세요.'),
});

const KakaoAdditionalInfo = (props) => {
  var userType;
  const [isSelected, setSelection] = useState(false);
  console.log(props.route.params.userinfo);
  useEffect(() => {
    userType = isSelected ? 'Tutor' : 'Tutee';
    console.log(userType);
  });

  const handleSubmitPress = (values) => {
    console.log(values);
    console.log(userType);
    userUpdate(props.route.params.userinfo.id, {
      user: {
        phone: values.phoneNumber,
        type: userType,
      },
    })
      .then((res) => {
        console.log(res.data.token);
        //setToken(res.data.token);
      })
      .then(() => {
        console.log('update success');
        props.navigation.replace('AuthLoading');
      })
      .catch((error) => {
        Alert.alert(
          '유저정보 업데이트에 실패하였습니다.',
          '중복된 전화번호는 가입이 불가합니다.',
        );
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topstyle}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.nametitle}>
          {props.route.params.userinfo.name} 님 안녕하세요.
        </Text>
      </View>
      <Formik
        style={styles.FormStyle}
        validationSchema={validationSchema}
        initialValues={{userName: '', phoneNumber: ''}}
        onSubmit={(values) => {
          //console.log(values)
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
          <>
            <Text style={styles.subtitle}>전화번호 (- 없이 입력)</Text>
            <TextInput
              name="phone-number"
              placeholder="     전화번호 (- 없이 입력)     "
              style={styles.textInput}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}

            <View style={{marginVertical: 30, flexDirection: 'row'}}>
              <Text style={styles.typeQtxt}>Tutor로 가입하시겠습니까?</Text>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                lineWidth={3}
                tintColor={'white'}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.buttonposition}
                onPress={handleSubmit}>
                <Text style={styles.buttonstyle}>가입하기</Text>
              </TouchableOpacity>
            </View>
          </>
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
    backgroundColor: colors.maincolor,
  },
  topstyle: {
    marginVertical: 30,
  },
  title: {
    color: 'white',
    fontSize: 33,
    fontWeight: 'bold',
    elevation: 5,
    shadowColor: '#5B7459',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  textstyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  FormStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  InputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  SignUpQStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  SignUpStyle: {
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 5,
  },
  checkbox: {
    alignSelf: 'center',
    marginLeft: 40,
  },
  lable: {
    margin: 9,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  textInput: {
    height: 50,
    width: '90%',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 'bold',
    elevation: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 20,
  },
  subtitle: {
    width: '90%',
    fontSize: 15,
    marginLeft: 40,
  },
  nametitle: {
    color: 'white',
    width: '90%',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 40,
    marginTop: 10,
  },
  typeQtxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    elevation: 5,
    shadowColor: '#5B7459',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  PickerBox: {
    position: 'absolute',
    height: 40,
    width: '35%',
    margin: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonposition: {
    width: 327,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    elevation: 5,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 20,
  },
  buttonstyle: {
    color: colors.maincolor,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default KakaoAdditionalInfo;
