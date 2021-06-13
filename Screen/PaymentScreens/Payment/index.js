import React from 'react';
import IMP from 'iamport-react-native';

import Loading from '../Loading';

import { getUserCode } from '../utils';

export default function Payment({ navigation }) {
  const params = navigation.getParam('params');
  const tierCode = navigation.getParam('tierCode');
  const { pg } = params;
  const data = {
    ...params,
    app_scheme: 'firstapp',
  };
  console.log(data)
  return (
    <IMP.Payment
      userCode={getUserCode(pg, tierCode, 'certification')}
      //tierCode={tierCode}
      loading={<Loading />}
      data={data}
      callback={response => navigation.replace('PaymentResult', { response ,data})}
    />
  );   
}
