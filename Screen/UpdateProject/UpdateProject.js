import React, {useState, useEffect} from 'react';
import {Button} from '../../src/components';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

import {Schema, tommorow} from './UpdateSchema';
import {HelpMessage, RenderHelp} from '../makeProjectScreen/Help';
import {RenderError} from '../makeProjectScreen/ValidMessage';
import {updateproject} from '../../src/Api';
import colors from '../../src/colors';
import {makePickerItemlist} from '../../src/utils/MakePickerItem';

const UpdateProject = (props) => {
  const {myinfo, latestpr} = props.route.params;
  const validationSchema = Schema;
  const InitValue = {
    title: latestpr.title,
    startDate: latestpr.started_at,
    duration: latestpr.duration,
    experienceduration: latestpr.experience_period,
    repeatstrength: latestpr.review_weight,
    dailyStudyTime: latestpr.required_time,
    howToAuth: latestpr.mission,
    projectIntroduce: latestpr.description,
    deposit: latestpr.deposit,
  };
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  var timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const [date, setDate] = useState(new Date(latestpr.started_at));
  const conditionfordate = new Date() >= date;
  var experienceend = new Date(latestpr.started_at);
  experienceend.setDate(experienceend.getDate() + latestpr.experience_period);
  const conditiondeposit = new Date() > experienceend;
  const [datetype, setDatetype] = useState();
  const handleSubmitPress = (values) => {
    console.log('프로젝트 제출 : ' + JSON.stringify(values));
    updateproject(latestpr.id, {
      project: {
        experience_period: values.experienceduration,
        description: values.projectIntroduce,
        deposit: values.deposit,
        image: '',
        title: values.title,
        duration: values.duration,
        started_at: values.startDate,
        required_time: values.dailyStudyTime,
        review_weight: values.repeatstrength,
        mission: values.howToAuth,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (latestpr.started_at !== values.startDate) {
          Alert.alert(
            '시작 날짜 변경',
            '시작 날짜가 변경되어 일정을 새로 생성하셔야합니다.',
            [
              {
                text: '확인',
                onPress: () => {
                  console.log('확인 누름');
                  props.navigation.navigate({
                    name: 'Book',
                    params: {projectId: res.data.id},
                  });
                },
              },
            ],
          );
        } else {
          Alert.alert(
            '교재 변경',
            '교재를 변경하실 경우 일정 생성도 다시하셔야 합니다.',
            [
              {
                text: '확인',
                onPress: () => {
                  console.log('확인 누름');
                  props.navigation.navigate({
                    name: 'Book',
                    params: {projectId: res.data.id},
                  });
                },
              },
              {
                text: '취소',
                onPress: () => {
                  console.log('취소 누름');
                  props.navigation.goBack();
                },
              },
            ],
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (Platform.OS === 'ios') {
      setDatetype('inline');
    } else {
      setDatetype('default');
    }
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Formik
          style={styles.FormStyle}
          validationSchema={validationSchema}
          initialValues={InitValue}
          onSubmit={(values) => {
            console.log(values);
            handleSubmitPress(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <>
              <Text style={styles.subtitle}>1. 프로젝트 이름</Text>
              <TextInput
                name="title"
                defaultValue={values.title.toString()}
                placeholder={latestpr.title.toString()}
                style={styles.textInput}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              <RenderError errors={errors.title} touched={touched.title} />

              <Text style={styles.subtitle}>2. 프로젝트 시작 일자</Text>
              <TextInput
                name="startDate"
                editable={!conditionfordate}
                style={styles.textInput}
                defaultValue={latestpr.started_at.substring(0, 10)}
                value={new Date(date - timezoneOffset)
                  .toISOString()
                  .substring(0, 10)}
                onChangeText={handleChange}
                onFocus={() => {
                  Keyboard.dismiss();
                  setIsDateTimePickerVisible(true);
                }}
              />
              {isDateTimePickerVisible && (
                <RNDateTimePicker
                  style={{width: 320, backgroundColor: 'white'}}
                  value={new Date()}
                  minimumDate={tommorow}
                  display={datetype}
                  onChange={(event, selectedDate) => {
                    console.log(event);
                    if (Platform.OS === 'android') {
                      if (event.type === 'set') {
                        setIsDateTimePickerVisible(false);
                        setDate(selectedDate);
                        setFieldValue('startDate', selectedDate);
                      } else {
                        setIsDateTimePickerVisible(false);
                        console.log('cancel test');
                      }
                    } else {
                      setIsDateTimePickerVisible(false);
                      setDate(selectedDate);
                      setFieldValue('startDate', selectedDate);
                    }
                  }}
                />
              )}
              <RenderError
                errors={errors.startDate}
                touched={touched.startDate}
              />

              <Text style={styles.subtitle}>
                3. 프로젝트 기간 (단위: 일)
                <RenderHelp messagetype={HelpMessage.duration} />
              </Text>
              <TextInput
                name="duration"
                defaultValue={values.duration.toString()}
                placeholder={latestpr.duration.toString()}
                style={styles.textInput}
                onChangeText={(value) => {
                  const parsedvalue = parseInt(value);
                  if (!isNaN(parsedvalue)) {
                    setFieldValue('duration', parsedvalue, 10);
                  } else {
                    values.duration = '';
                    console.log('string is typed');
                  }
                }}
                onBlur={handleBlur('duration')}
                keyboardType="numeric"
              />
              <RenderError
                errors={errors.duration}
                touched={touched.duration}
              />

              <Text style={styles.subtitle}>
                4. 프로젝트 체험 기간 (단위: 일)
                <RenderHelp messagetype={HelpMessage.experienceduration} />
              </Text>
              <View style={styles.pickerstyle}>
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  onValueChange={(value, idx) => {
                    setFieldValue('experienceduration', value);
                  }}
                  items={makePickerItemlist(1, 7)}
                  placeholder={{
                    label: '체험기간을 선택해주세요',
                    value: '0',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>
                    {values.experienceduration} 일
                  </Text>
                </RNPickerSelect>
              </View>
              <RenderError
                errors={errors.experienceduration}
                touched={touched.experienceduration}
              />

              <Text style={styles.subtitle}>
                5. 최소 학습시간 (단위: 분)
                <RenderHelp messagetype={HelpMessage.dailyStudyTime} />
              </Text>
              <TextInput
                name="dailyStudyTime"
                defaultValue={values.dailyStudyTime.toString()}
                placeholder={latestpr.required_time.toString()}
                style={styles.textInput}
                onChangeText={(value) => {
                  const parsedvalue = parseInt(value);
                  if (!isNaN(parsedvalue)) {
                    setFieldValue('dailyStudyTime', parsedvalue, 10);
                  } else {
                    values.dailyStudyTime = '';
                    console.log('string is typed');
                  }
                }}
                onBlur={handleBlur('dailyStudyTime')}
                keyboardType="numeric"
              />
              <RenderError
                errors={errors.dailyStudyTime}
                touched={touched.dailyStudyTime}
              />

              <Text style={styles.subtitle}>
                6. 복습 강도 (최소 1단계 ~ 10단계)
                <RenderHelp messagetype={HelpMessage.repeatstrength} />
              </Text>
              <View style={styles.pickerstyle}>
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  onValueChange={(value, idx) => {
                    setFieldValue('repeatstrength', value);
                  }}
                  items={makePickerItemlist(1, 10)}
                  placeholder={{
                    label: '복습강도를 선택해주세요',
                    value: '0',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>
                    {values.repeatstrength} 단계
                  </Text>
                </RNPickerSelect>
              </View>
              <RenderError
                errors={errors.repeatstrength}
                touched={touched.repeatstrength}
              />

              <Text style={styles.subtitle}>
                7. 프로젝트 인증 미션
                <RenderHelp messagetype={HelpMessage.howToAuth} />
              </Text>
              <TextInput
                name="howToAuth"
                placeholder={latestpr.mission}
                style={[styles.textInput, {height: 100}]}
                onChangeText={handleChange('howToAuth')}
                onBlur={handleBlur('howToAuth')}
                value={values.howToAuth}
                multiline={true}
              />
              <RenderError
                errors={errors.howToAuth}
                touched={touched.howToAuth}
              />

              <Text style={styles.subtitle}>8. 프로젝트 소개</Text>
              <TextInput
                name="projectIntroduce"
                placeholder={latestpr.description}
                style={[styles.textInput, {height: 100}]}
                onChangeText={handleChange('projectIntroduce')}
                onBlur={handleBlur('projectIntroduce')}
                value={values.projectIntroduce}
                multiline={true}
              />
              <RenderError
                errors={errors.projectIntroduce}
                touched={touched.projectIntroduce}
              />

              <Text style={styles.subtitle}>
                9. 보증금
                <RenderHelp messagetype={HelpMessage.deposit} />
              </Text>
              <TextInput
                name="deposit"
                editable={!conditiondeposit}
                defaultValue={values.deposit.toString()}
                placeholder={latestpr.deposit.toString()}
                style={styles.textInput}
                onChangeText={(value) => {
                  const parsedvalue = parseInt(value);
                  if (!isNaN(parsedvalue)) {
                    setFieldValue('deposit', parsedvalue, 10);
                  } else {
                    values.deposit = '';
                    console.log('string is typed');
                  }
                }}
                onBlur={handleBlur('deposit')}
                keyboardType="numeric"
              />
              <RenderError errors={errors.deposit} touched={touched.deposit} />

              <View style={styles.button}>
                <Button onPress={handleSubmit}>프로젝트 수정하기</Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  textInput: {
    height: 40,
    width: '90%',
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.subcolor,
    fontSize: 15,
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
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    width: '90%',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textStyle: {
    width: '55%',
    padding: 10,
    backgroundColor: 'white',
    fontSize: 15,
    marginTop: 7,
    color: 'black',
  },
  pickerstyle: {
    width: '90%',
    marginTop: '1%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.subcolor,
    paddingRight: 30,
    color: 'black',
    backgroundColor: 'white',
  },
});

export default UpdateProject;
