import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import colors from '../colors';
import kakaobtn from '../../assets/kakao_login_large_narrow.png';
const Button = ({onPress, children}) => {
  const {button, text} = styles;
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={styles.buttonposition} onPress={onPress}>
        <Text style={styles.buttonstyle}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};
const DestroyButton = ({onPress, children}) => {
  const {button, text} = styles;
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={[styles.buttonposition, {backgroundColor: 'red'}]}
        onPress={onPress}>
        <Text style={[styles.buttonstyle, {color: 'black'}]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};
const KakaoButton = ({onPress}) => {
  const {button, text} = styles;
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={onPress} style={styles.kakaobuttonposition}>
        <Image style={styles.kakaobuttonstyle} source={kakaobtn} />
      </TouchableOpacity>
    </View>
  );
};
const styles = {
  buttonposition: {
    width: 327,
    height: 50,
    backgroundColor: colors.maincolor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  kakaobuttonposition: {
    width: 327,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonstyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  kakaobuttonstyle: {
    width: 190,
    height: 45,
    borderRadius: 10,
  },
};

export {Button, KakaoButton, DestroyButton};
