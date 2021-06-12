/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Stack from './Navigation/StackNavigation';
import {decode, encode} from 'base-64';
import {CurrentUser} from './src/utils/CurrentUser';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  const [context, setContext] = useState();
  return (
    <CurrentUser.Provider value={[context, setContext]}>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </CurrentUser.Provider>
  );
}
