import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {makePickerItemlist} from './MakePickerItem';
import colors from '../colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import RNPickerSelect from 'react-native-picker-select';

export function RenderChapter({chapters, deletechapter}) {
  console.log(chapters);
  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }
  return (
    <View style={styles.chapterlist}>
      {chapters.map((chapter, key) => {
        // console.log(chapter.weight)
        return (
          <View key={key} style={styles.chapterView}>
            <Text style={styles.textStyle}>{chapter.title}</Text>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => {
                chapter.weight = value;
                console.log(chapters);
              }}
              items={makePickerItemlist(1, 10)}
              style={{...pickerSelectStyles}}
              placeholder={{}}
              fixAndroidTouchableBug={true}
            />
            <TouchableOpacity
              onPress={(e) => {
                deletechapter(key);
              }}>
              <Icon name="close-box" color={colors.maincolor} size={30} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  chapterView: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  textStyle: {
    width: '65%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.subcolor,
    textAlignVertical: 'center',
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
  chapterlist: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },

  pickerstyle: {
    width: '25%',
    marginTop: '1%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 30,
    color: 'black',
    backgroundColor: 'white',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: '100%',
    width: Dimensions.get('screen').width * 0.2,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.maincolor,
    borderRadius: 15,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    height: '100%',
    width: Dimensions.get('screen').width * 0.2,
    textAlign: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.maincolor,
    borderRadius: 15,
    color: 'black',
  },
});
