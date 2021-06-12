import React from 'react';
import {View, Modal, StyleSheet, Dimensions, Image} from 'react-native';
import {Button} from '../../src/components/Button';
import explain1 from '../../assets/explain1.png';
import explain2 from '../../assets/explain2.png';
import explain3 from '../../assets/explain3.png';
import explain4 from '../../assets/explain4.png';
import Swiper from 'react-native-swiper';

const SwiperModal = (props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.modalBackground}>
        <View style={styles.swiperView}>
          <Swiper showsButtons={true}>
            <View style={styles.slide1}>
              <Image
                source={explain1}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={explain2}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={explain3}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={explain4}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </Swiper>
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
    width: Dimensions.get('screen').width,
    borderRadius: 30,
    backgroundColor: 'white',
    marginTop: 100,
    marginBottom: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  swiperView: {
    flex: 1,
    marginTop: 50,
    width: '100%',
    padding: 10,
  },
  modal: {
    width: '80%',
    height: '20%',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwiperModal;
