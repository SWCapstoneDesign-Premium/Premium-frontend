import React ,{useEffect}from 'react';
import { View } from 'react-native';
import { List, ListItem, Icon, Button, Text } from 'native-base';

import { resultStyles, resultSuccessStyles, resultFailureStyles } from '../styles';
import {paymentstatus} from '../../../src/Api'
export default function PaymentResult({ navigation }) {
  const response = navigation.getParam('response');
  const data = navigation.getParam('data')
  const { imp_success, success, imp_uid, merchant_uid, error_msg, pay_method , pg_type} = response;
  const {amount, projID} = data;
  const { wrapper, title, listContainer, list, label, value } = resultStyles;
  //{"amount": 11111, "app_scheme": "firstapp", "buyer_email": "example@example.com", "buyer_name": "송수빈", "buyer_tel": "01012341234", "escrow": false, "m_redirect_url": "http://localhost/iamport", "merchant_uid": "mid_1621247167329", "name": "따숲", "pay_method": "card", "pg": "html5_inicis", "projID": 62, "tuteeID": 103}
  // [WARNING: 이해를 돕기 위한 것일 뿐, imp_success 또는 success 파라미터로 결제 성공 여부를 장담할 수 없습니다.]
  // 아임포트 서버로 결제내역 조회(GET /payments/${imp_uid})를 통해 그 응답(status)에 따라 결제 성공 여부를 판단하세요.
  const isSuccess = !(imp_success === 'false' || imp_success === false || success === 'false' || success === false);
  const { icon, btn, btnText, btnIcon } = isSuccess ? resultSuccessStyles : resultFailureStyles;
  console.log(response)
  console.log("+++++++++++++++++++++++++++++++++++")
  console.log(data)

  //imp_uid/merchant_uid
  //tutee id/deposit/proj id
  const paysuccess=()=>{
    console.log('프로젝트 신청')
    navigation.popToTop()
  }
  useEffect(() => {
    if(isSuccess){
      console.log('payment success')
      paymentstatus(
        {
          "imp_uid":imp_uid,
          "merchant_uid":merchant_uid,
          "deposit":amount,
          "project_id":projID
        }
      )
      .then(res => console.log(res))
      .catch(e => console.log(e))
    }
  }, []);
  
  return (
    <View style={wrapper}>
      <Icon
        style={icon}
        type="AntDesign"
        name={isSuccess ? 'checkcircle' : 'exclamationcircle'}
      />
      <Text style={title}>{`결제에 ${isSuccess ? '성공' : '실패'}하였습니다`}</Text>
      <List style={listContainer}>
        <ListItem style={list}>
          <Text style={label}>아임포트 번호</Text>
          <Text style={value}>{imp_uid}</Text>
          <Text style={value}>{pay_method}</Text>
        </ListItem>
        {isSuccess ? (
          <ListItem style={list}>
            <Text style={label}>주문번호</Text>
            <Text style={value}>{merchant_uid}</Text>
          </ListItem>
        ) : (
          <ListItem style={list}>
            <Text style={label}>에러메시지</Text>
            <Text style={value}>{error_msg}</Text>
          </ListItem>
        )}
      </List>
      {
        isSuccess?
            <Button
            bordered
            transparent
            style={btn}
            onPress={paysuccess}
          >
            <Icon name="arrow-back" style={btnIcon} />
            <Text style={btnText}>프로젝트 참여</Text>
          </Button>
        :
            <Button
            bordered
            transparent
            style={btn}
            onPress={() => navigation.navigate('Home')}
          >
            <Icon name="arrow-back" style={btnIcon} />
            <Text style={btnText}>돌아가기</Text>
          </Button>
      }
    </View>
  );
}
