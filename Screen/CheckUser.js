import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {getcurrentuser} from '../src/Api';

const CheckUser = (props) => {
  const CheckCurrentUser = async (props) => {
    try {
      await getcurrentuser()
        .then((res) => {
          console.log(res.data);
          if (res.data.type === '') {
            props.navigation.replace('AdditionalInfo');
          } else {
            props.navigation.replace('AuthLoading');
          }
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log('get current user request Error!!!!!!!: ' + error.message);
    }
  };
  useEffect(() => {
    CheckCurrentUser(props);
  });
  return (
    <View style={styles.container}>
      <ActivityIndicator color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CheckUser;
