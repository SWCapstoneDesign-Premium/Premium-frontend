import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import colors from './colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Imagepicker = (props) => {
  const [imageSource, setImageSource] = useState(props.defaultimage);
  console.log(props);
  const options = {
    title: 'Load Photo',
    mediaType: 'photo',
    customButtons: [
      {name: 'button_id_1', title: 'CustomButton 1'},
      {name: 'button_id_2', title: 'CustomButton 2'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const showCamera = () => {
    launchCamera(options, (response) => {
      if (response.error) {
        console.log('LaunchCamera Error: ', response.error);
      } else {
        console.log('user take picture!!');
        console.log(response);
        console.log(response.uri);
        if (response.uri !== undefined) {
          props.getImage(response);
          setImageSource(response.uri);
        }
      }
    });
  };

  const showCameraRoll = () => {
    launchImageLibrary(options, (response) => {
      if (response.error) {
        console.log('LaunchImageLibrary Error: ', response.error);
      } else {
        console.log('user pick picture!!');
        console.log('=================================');
        console.log(response.uri);
        if (response.uri !== undefined) {
          props.getImage(response);
          setImageSource(response.uri);
        }
      }
    });
  };
  //const testfunction = () => {
  //  props.parent(imageSource);
  //}
  //useEffect(() => {
  //  props.parent(imageSource);
  //})
  return (
    <View style={styles.container}>
      <View style={styles.pickedImage}>
        {imageSource ? (
          <Image style={styles.Photo} source={{uri: imageSource}} />
        ) : (
          <Text style={styles.Photo} />
        )}
      </View>
      <View style={styles.buttonview}>
        <TouchableOpacity style={styles.ImagepickerButton} onPress={showCamera}>
          <Text styles={styles.textstyle}>카메라</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ImagepickerButton}
          onPress={showCameraRoll}>
          <Text styles={styles.textstyle}>갤러리</Text>
        </TouchableOpacity>
        {/*<Button title="test" style={styles.ImagepickerButton} onPress={testfunction} />*/}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textstyle: {},
  pickedImage: {
    flex: 2,
    alignItems: 'center',
    margin: 15,
  },
  buttonview: {
    flex: 1,
    margin: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  Photo: {
    flex: 1,
    width: 200,
    height: 200,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  ImagepickerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.maincolor,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 50,
    marginHorizontal: 10,
  },
});
export default Imagepicker;
