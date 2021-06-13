import AsyncStorage from '@react-native-community/async-storage';

export const setToken = async (token) => {
  //asyncstorage token 생성
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.log('AsyncStorage setting Error: ' + error.message);
  }
};

export const setType = async (type) => {
  //asyncstorage token 생성
  try {
    await AsyncStorage.setItem('type', type);
  } catch (error) {
    console.log('AsyncStorage setting type Error: ' + error.message);
  }
};

export const setStatus = async (status) => {
  //asyncstorage token 생성
  try {
    await AsyncStorage.setItem('status', status);
  } catch (error) {
    console.log('AsyncStorage setting Error: ' + error.message);
  }
};
export const setName = async (name) => {
  //asyncstorage token 생성
  try {
    await AsyncStorage.setItem('name', name);
  } catch (error) {
    console.log('AsyncStorage setting Error: ' + error.message);
  }
};

export const setUser = async (info) => {
  //asyncstorage token 생성
  try {
    await AsyncStorage.setItem('userinfo', JSON.stringify(info));
  } catch (error) {
    console.log('AsyncStorage setting Error: ' + error.message);
  }
};

export const setProjects = async (projects) => {
  try {
    await AsyncStorage.setItem('projects', JSON.stringify(projects));
  } catch (error) {
    console.log('AsyncStorage setting Error: ' + error.message);
  }
};

export const setSearchHistory = async (keyword) => {
  try {
    await AsyncStorage.setItem('keyword', JSON.stringify(keyword));
  } catch (error) {
    console.log('AsyncStorage setting Error: ' + error.message);
  }
};
