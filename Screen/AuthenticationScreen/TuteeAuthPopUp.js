import React from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import {Button} from '../../src/components/Button';
import ImageModal from 'react-native-image-modal';

const TuteeAuthPopUp = (props) => {
  const {width, height} = useWindowDimensions();
  console.log(props.route.params.imagesource);
  return (
    <View style={styles.modalBackground}>
      <View
        style={{flex: 1, margin: 20, width: '100%', justifyContent: 'center'}}>
        <ImageModal
          resizeMode="contain"
          style={{
            width: width,
            height: height * 0.7,
          }}
          source={{
            uri: props.route.params.imagesource,
          }}
        />
      </View>
      <View style={styles.modal}>
        <Button
          onPress={() => {
            console.log('go back');
            props.navigation.goBack();
          }}>
          Close
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modal: {
    width: '80%',
    height: '10%',
    alignItems: 'center',
  },
});

export default TuteeAuthPopUp;
