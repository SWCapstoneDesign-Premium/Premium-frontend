import React from 'react';
import {View, Modal, StyleSheet, Dimensions} from 'react-native';
import {Button} from '../../src/components/Button';
import PreviewCalendar from './PreviewCalendar';

const SchedulePopup = (props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.modalBackground}>
        <View style={styles.calendarView}>
          <PreviewCalendar
            schedule={props.schedule}
            chapters={props.chapters}
          />
        </View>
        <View style={styles.modal}>
          <Button onPress={() => props.setModalVisible(false)}>Close</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.8,
  },
  calendarView: {
    flex: 1,
    marginTop: 50,
    width: '100%'
  },
  modal: {
    width: '80%',
    height: '20%',
  },
});

export default SchedulePopup;
