import React from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'native-base';

import styles, { header, button } from './styles';

export default function Home({ navigation }) {
  const { wrapper, container } = styles;
  return (
    <View style={wrapper}>
      <View style={container}>
        <View style={header.container}>
          <Text style={header.title}>아임포트 결제</Text>
          <Text style={header.text}>아래 버튼을 눌러 결제 또는 본인인증을 진행해주세요.</Text>
        </View>
        <View style={button.container}>
          <Button
            style={button.module}
            onPress={() => navigation.push('PaymentTest')}
          >
            <Icon
              type="AntDesign"
              name="creditcard"
              style={button.icon}
            />
            <Text style={button.text}>결제</Text>
          </Button>
          <Button
            style={button.module}
            onPress={() => navigation.push('CertificationTest')}
          >
            <Icon
              type="AntDesign"
              name="user"
              style={button.icon}
            />
            <Text style={button.text}>본인인증</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}