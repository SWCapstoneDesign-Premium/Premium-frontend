import React from 'react';
import {StyleSheet, Text} from 'react-native';

export function RenderError({errors, touched}) {
  if (errors && touched) {
    return <Text style={styles.errorText}>{errors}</Text>;
  } else {
    return <Text></Text>;
  }
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: 'red',
  },
});
