import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';

const LoadingModal = (props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <ActivityIndicator color="black" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.8,
  },
  modal: {
    width: '80%',
    height: '20%',
  },
});
export default LoadingModal;
