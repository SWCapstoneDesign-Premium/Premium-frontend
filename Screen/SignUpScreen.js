import React, {useState, useEffect} from 'react';
import {Button} from '../src/components';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {signup} from '../src/Api';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ReloadInstructions} from 'react-native/Libraries/NewAppScreen';
import colors from '../src/colors';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('이름을 입력해주세요.'),
  email: Yup.string()
    .required('이메일을 입력해주세요.')
    .email('이메일 형식이 아닙니다.'),
  password: Yup.string().required('비밀번호를 입력해주세요.'),
  Comfirm_password: Yup.string()
    .required('비밀번호 확인을 입력해주세요.')
    .oneOf([Yup.ref('password')], '비밀번호가 다릅니다.'),
  Phone: Yup.number()
    .integer('숫자만 입력해주세요')
    .min(8)
    .required('전화번호를 입력해주세요.'),
});

const SignUp = (props) => {
  const [selectedPicker, setSelectedPicker] = useState('은행 선택');
  var userType;
  const [isSelected, setSelection] = useState(false);

  useEffect(() => {
    userType = isSelected ? 'Tutor' : 'Tutee';
    console.log(userType);
  });

  const handleSubmitPress = (values) => {
    console.log(values.name);
    signup({
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.Phone,
      type: userType,
    })
      .then(() => {
        alert('회원가입이 성공하였습니다.');
        props.navigation.replace('Signin');
        console.log('Go to Home from sign in ');
      })
      .catch((error) => {
        alert('이미 생성되어 있는 아이디 입니다.');
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.topstyle}>
          <Text style={styles.textstyle}>Create Account</Text>
        </View>
        <Formik
          style={styles.FormStyle}
          validationSchema={validationSchema}
          initialValues={{
            name: '',
            email: '',
            password: '',
            Comfirm_password: '',
            Phone: '',
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
            <View>
              <>
                <TextInput
                  name="name"
                  placeholder="    이름"
                  style={styles.textInput}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
                <TextInput
                  name="email"
                  placeholder="     이메일 주소"
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <TextInput
                  name="password"
                  placeholder="     비밀번호"
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
                  placeholder="     비밀번호 확인"
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
                  placeholder="     전화번호 (- 없이 입력)     "
                  style={styles.textInput}
                  onChangeText={handleChange('Phone')}
                  onBlur={handleBlur('Phone')}
                  value={values.Phone}
                />
                {errors.Phone && touched.Phone && (
                  <Text style={styles.errorText}>{errors.Phone}</Text>
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
                <View style={{flexDirection: 'row', marginTop: 20}}>
                  <Text
                    style={styles.SignUpStyle}
                    onPress={() => props.navigation.pop()}>
                    로그인으로 돌아가기
                  </Text>
                </View>
              </>
            </View>
          )}
        </Formik>
      </SafeAreaView>
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
  iconstyle: {
    width: 90,
    height: 90,
  },
  topstyle: {
    marginVertical: 30,
  },
  textstyle: {
    color: 'white',
    fontSize: 33,
    fontWeight: 'bold',
    elevation: 5,
    shadowColor: '#5B7459',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
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
  FormStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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

  AccountInput: {
    height: 40,
    width: '55%',
    margin: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'center',
  },
  textInput: {
    height: 50,
    width: '100%',
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
    fontSize: 15,
    alignSelf: 'center',
    padding: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    marginLeft: 40,
  },
  lable: {
    margin: 9,
  },
  Button: {
    marginTop: 10,
    alignSelf: 'center',
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

export default SignUp;
