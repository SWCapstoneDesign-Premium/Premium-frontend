import React from 'react';
import {View, Modal, StyleSheet, Dimensions, Image} from 'react-native';
import {Button} from '../../src/components/Button';
import explain from '../../assets/일정생성설명.png';

const ExplainModal = (props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalBase}>
          <View style={styles.imagebox}>
            <Image
              source={explain}
              resizeMode="contain"
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View style={{marginVertical: 20}}>
            <Button onPress={() => props.setModalVisible(false)}>Close</Button>
          </View>
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
    width: Dimensions.get('screen').width,
    borderRadius: 30,
    marginVertical: 110,
  },
  modalBase: {
    width: Dimensions.get('screen').width * 0.85,
    backgroundColor: 'white',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  imagebox: {
    flex: 1,
    marginTop: 50,
    width: '100%',
  },
});

export default ExplainModal;
