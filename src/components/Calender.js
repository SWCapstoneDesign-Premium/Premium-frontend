const moment = require('moment');
import React from 'react';
import {Calendar} from 'react-native-calendars';
import {View, Text} from 'react-native';
import {Card} from 'react-native-paper';
import {useEffect, useState} from 'react';

function Calender(props) {
  let Trial = false;
  props.project.status === 'trial' ? (Trial = true) : (Trial = false);

  let experience_period = props.project.project.experience_period;
  const [markedDates, setmarkedDates] = useState();
  const [chapter, setchapter] = useState('');
  const [pickday, setpickday] = useState();
  const DateSet = () => {
    var days = {};
    if (!props.plans) {
      console.log('null');
    } else {
      let Plans = props.plans;
      const color = [
        ['#FECCBE', '#FD8A69'],
        ['#FEEBB6', '#FFCD4A'],
        ['#DDECCA', '#AFD485'],
        ['#CCD2F0', '#9FA9D8'],
      ];
      let colorpick = 0;
      let experienceEnd = moment(Plans[0].start_at).add(
        experience_period - 1,
        'd',
      );

      Plans.map((item) => {
        colorpick++;
        var start_date = moment(item.start_at).format('YYYY-MM-DD');
        var end_date = moment(item.end_at).format('YYYY-MM-DD');
        var date_start = moment(item.start_at);
        var date_end = moment(item.end_at);
        var PalnDays = date_end.diff(date_start, 'days');

        if (item.holiday === 'holiday') {
          end_date = moment(item.end_at)
            .subtract(1, 'days')
            .format('YYYY-MM-DD');
          PalnDays -= 1;
        }
        if (Trial) {
          var experFinStart = date_start.diff(experienceEnd, 'days');
          var experFinEnd = date_end.diff(experienceEnd, 'days');

          // 체험기간 마감 이전일 경우
          if (experFinStart < 0) {
            //프로젝트 기한이 하루인 경우
            if (PalnDays == 0) {
              Object.assign(days, {
                [start_date]: {
                  disabled: true,
                  startingDay: true,
                  color: color[colorpick % color.length][1],
                  endingDay: true,
                  textColor: 'black',
                },
              });
            }
            //프로젝트 기한이 여러 날일 경우
            else {
              //프로젝트 마감이 체험판 마감일 전일 경우
              if (experFinEnd < 0) {
                for (let j = 1; j <= PalnDays; j++) {
                  Object.assign(
                    days,
                    {
                      [start_date]: {
                        startingDay: true,
                        color: color[colorpick % color.length][0],
                        textColor: 'black',
                      },
                    },
                    {
                      [moment(start_date).add(j, 'd').format('YYYY-MM-DD')]: {
                        color: color[colorpick % color.length][1],
                        textColor: 'gray',
                      },
                    },
                    {
                      [end_date]: {
                        endingDay: true,
                        color: color[colorpick % color.length][0],
                        textColor: 'black',
                      },
                    },
                  );
                }
              }
              //체험판 마감이 프로젝트 마감보다 먼저인 경우
              else {
                for (let j = 1; j < experFinStart * -1; j++) {
                  Object.assign(
                    days,
                    {
                      [start_date]: {
                        startingDay: true,
                        color: color[colorpick % color.length][0],
                        textColor: 'black',
                      },
                    },
                    {
                      [moment(start_date).add(j, 'd').format('YYYY-MM-DD')]: {
                        color: color[colorpick % color.length][1],
                        textColor: 'gray',
                      },
                    },
                    {
                      [experienceEnd.format('YYYY-MM-DD')]: {
                        endingDay: true,
                        color: color[colorpick % color.length][0],
                        textColor: 'black',
                      },
                    },
                  );
                }
              }
            }
          }
        } else {
          if (PalnDays == 0) {
            Object.assign(days, {
              [start_date]: {
                disabled: true,
                startingDay: true,
                color: color[colorpick % color.length][1],
                endingDay: true,
                textColor: 'black',
              },
            });
          } else {
            for (let j = 1; j <= PalnDays; j++) {
              Object.assign(
                days,
                {
                  [start_date]: {
                    startingDay: true,
                    color: color[colorpick % color.length][0],
                    textColor: 'black',
                  },
                },
                {
                  [moment(start_date).add(j, 'd').format('YYYY-MM-DD')]: {
                    color: color[colorpick % color.length][1],
                    textColor: 'gray',
                  },
                },
                {
                  [end_date]: {
                    endingDay: true,
                    color: color[colorpick % color.length][0],
                    textColor: 'black',
                  },
                },
              );
            }
          }
        }
      });
      setmarkedDates(days);
    }
  };

  const checkPlan = (day) => {
    let Plans = props.plans;
    var date = moment(day.dateString);
    setpickday(day);
    var isplan = false;
    let experienceEnd = moment(Plans[0].start_at).add(
      experience_period - 1,
      'd',
    );
    Plans.map((plan) => {
      let difStart = date.diff(moment(plan.start_at), 'days');
      let difEnd = date.diff(moment(plan.end_at), 'days');
      let experFinEnd = date.diff(experienceEnd, 'days');
      if (plan.holiday === 'holiday') {
        difEnd = date.diff(moment(plan.end_at).subtract(1, 'days'), 'days');
      }
      if (Trial) {
        if (experFinEnd <= 0) {
          if (difStart >= 0 && difEnd <= 0) {
            setchapter(plan.chapter.title);
            isplan = true;
          }
        }
      } else {
        if (difStart >= 0 && difEnd <= 0) {
          setchapter(plan.chapter.title);
          isplan = true;
        }
      }
    });

    if (!isplan) setchapter('');
  };

  useEffect(() => {
    DateSet();
  }, [props]);

  return (
    <View style={{paddingTop: 20, bottom: 20, flex: 1}}>
      <Calendar
        markedDates={markedDates}
        markingType={'period'}
        style={{borderRadius: 25, height: 350}}
        onDayPress={(day) => {
          checkPlan(day);
        }}
        theme={{
          todayTextColor: 'skyblue',
        }}
      />
      {chapter ? (
        <Card style={styles.cardPosition}>
          <Text>
            {pickday.year}년 {pickday.month}월 {pickday.day}일의 일정 😎
          </Text>
          <Text style={styles.planTxt}>{chapter}</Text>
        </Card>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}

const styles = {
  cardPosition: {
    marginTop: 20,
    padding: 20,
  },
  planTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 8,
  },
};
export default Calender;
