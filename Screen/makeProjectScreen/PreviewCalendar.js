import React from 'react';
import {Agenda} from 'react-native-calendars';
import {StyleSheet, View, Text} from 'react-native';
import {useState, useEffect} from 'react';
import colors from '../../src/colors';

const moment = require('moment');

function PreviewCalendar(props) {
  const [markedDates, setmarkedDates] = useState();
  const [agenda, setAgenda] = useState();
  const color = [
    ['#A1EBEB', '#5FDBDB'],
    ['#FFDF93', '#FFCC53'],
    ['#ACC2FF', '#7372FF'],
    ['#FFDBEC', '#FF9BCA'],
  ];

  useEffect(() => {
    var tempschedule = {};
    var tempagenda = {};
    props.schedule.map((item, index) => {
      const colorIndex = index % 4;
      const startDate = moment(item.start_at);
      var endDate = moment(item.end_at);
      if (item.holiday === 'holiday') {
        endDate = endDate.subtract(1, 'days');
      }
      const subnum = endDate.diff(startDate, 'days');
      if (subnum === 0) {
        Object.assign(
          tempagenda,
          {
            [startDate.format('YYYY-MM-DD')]: [
              {title: props.chapters[index].title},
            ],
          },
          {
            [endDate.format('YYYY-MM-DD')]: [
              {title: props.chapters[index].title},
            ],
          },
        );
        Object.assign(
          tempschedule,
          {
            [startDate.format('YYYY-MM-DD')]: {
              startingDay: true,
              color: color[colorIndex][0],
              textColor: 'white',
            },
          },
          {
            [endDate.format('YYYY-MM-DD')]: {
              endingDay: true,
              color: color[colorIndex][0],
              textColor: 'white',
            },
          },
        );
      } else {
        for (let j = 1; j <= subnum; j++) {
          Object.assign(
            tempagenda,
            {
              [startDate.format('YYYY-MM-DD')]: [
                {title: props.chapters[index].title},
              ],
            },
            {
              [moment(startDate).add(j, 'd').format('YYYY-MM-DD')]: [
                {title: props.chapters[index].title},
              ],
            },
            {
              [endDate.format('YYYY-MM-DD')]: [
                {title: props.chapters[index].title},
              ],
            },
          );
          Object.assign(
            tempschedule,
            {
              [startDate.format('YYYY-MM-DD')]: {
                startingDay: true,
                color: color[colorIndex][0],
                textColor: 'white',
              },
            },
            {
              [moment(startDate).add(j, 'd').format('YYYY-MM-DD')]: {
                color: color[colorIndex][1],
                textColor: 'white',
              },
            },
            {
              [endDate.format('YYYY-MM-DD')]: {
                endingDay: true,
                color: color[colorIndex][0],
                textColor: 'white',
              },
            },
          );
        }
      }
    });
    console.log('-------------------- agenda ----------------------');
    console.log(tempagenda);
    console.log('--------------------------------------------------');
    console.log('=================schedule=================');
    console.log(tempschedule);
    console.log('==========================================');
    setmarkedDates(tempschedule);
    setAgenda(tempagenda);
  }, []);

  const showchapter = (item) => {
    var boxcolor = '';
    const agendaobject = Object.values(agenda);
    const markedobject = Object.values(markedDates);
    for (var i = 0; i < agendaobject.length; i++) {
      if (item.title === agendaobject[i][0].title) {
        boxcolor = markedobject[i].color;
        break;
      }
    }
    return (
      <View style={[styles.itemContainer, {backgroundColor: boxcolor}]}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        selected={moment(props.schedule[0].start_at).format('YYYY-MM-DD')}
        items={agenda}
        onDayPress={(day) => console.log(day)}
        markedDates={markedDates}
        markingType={'period'}
        renderItem={showchapter}
        style={styles.calendarstyle}
        theme={{
          arrowColor: 'white',
          calendarBackground: '#e2f7e8',
          textSectionTitleColor: 'black',
          textSectionTitleDisabledColor: 'gray',
          monthTextColor: 'black',
          todayTextColor: '#00adf5',
          agendaTodayColor: 'red',
          agendaKnobColor: 'green',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  calendarstyle: {
    width: 360,
    height: 450,
    borderRadius: 30,
    backgroundColor: colors.subcolor,
  },
  itemContainer: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PreviewCalendar;
