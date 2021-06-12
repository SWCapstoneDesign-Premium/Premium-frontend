import React, {useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {WebView} from 'react-native-webview';
import baseurl from '../../config';

const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
RCTNetworking.clearCookies(() => {});
const KakaoLogin = (props) => {
  const backend = baseurl.port + '/auth/kakao';
  console.log(backend);
  const webview = useRef(null);

  const onWebViewMessage = (e) => {
    let res = JSON.parse(e.nativeEvent.data);

    if (res.error) {
      console.log(res.error);
      props.navigation.goBack(); //back to login
      return;
    }
    if (res.token !== undefined) {
      console.log('============= 크롤링된 token ================');
      console.log(res.token);
      console.log('=============================');
      AsyncStorage.setItem('token', res.token);
      props.navigation.replace('CheckUserData');
    }
  };

  const INJECTED_JAVASCRIPT = `(function() {
      const body = document.querySelector("body");
      const pre = body.querySelector('pre').textContent 
      window.ReactNativeWebView.postMessage(pre);
    })();`;

  return (
    <WebView
      ref={webview}
      source={{uri: backend}}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      onLoadStart={() => {
        console.log('loading start');
      }}
      onLoadEnd={(e) => {
        console.log('loading end');
      }}
      onError={(syntheticEvent) => {
        const {nativeEvent} = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
        alert('네트워크 에러!!');
        props.navigation.goBack();
      }}
      onMessage={onWebViewMessage}
    />
  );
};

export default KakaoLogin;
