import axios from 'axios';
import Qs from 'qs';
import AsyncStorage from '@react-native-community/async-storage';
import baseurl from '../config';

const PORT = baseurl.port;

let formheaders = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: '',
  },
};

const FORMAPI = axios.create(formheaders);
FORMAPI.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem('token');
    config.headers.Authorization = token;
    console.log(config);

    config.paramsSerializer = (params) => {
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      });
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

let headers = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: '',
  },
};
const kakaoBook = axios.create({
  headers: {Authorization: baseurl.kakaotoken},
});

const API = axios.create(headers);
API.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem('token');
    config.headers['Authorization'] = token;
    console.log(config);

    config.paramsSerializer = (params) => {
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      });
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const login = (user) => API.post(PORT + '/login', {user});
export const refresh = () => API.post(PORT + '/refresh');
export const logout = () => API.delete(PORT + '/logout');
export const signup = (user) => API.post(PORT + '/signup', {user});
export const userdestroy = (userid) => API.delete(PORT + `/users/${userid}`);
export const authrequest = (image) => API.post(PORT + '/auths/', image);
export const getauth = () => API.get(PORT + '/auths');
export const getproject = (projectid) =>
  API.get(PORT + `/projects/${projectid}`);
export const getchapter = (params) =>
  API.get(PORT + '/books/get_list/', {params});
export const getBook = (params) =>
  kakaoBook.get('https://dapi.kakao.com/v3/search/book', {params});
export const createBook = (book) => API.post(PORT + '/books', {book});
export const getprojects = (params) => API.get(`${PORT}/projects`, {params});
export const postoptions = (params) => API.post(`${PORT}/options`, params);
export const getattendances = () => API.get(PORT + '/attendances');
export const createproject = (project) =>
  API.post(PORT + '/projects', {project});
export const getcategories = () => API.get(PORT + '/categories');
export const updateproject = (projectid, {project}) =>
  API.put(PORT + `/projects/${projectid}`, {project});
export const createschedule = (id, params) =>
  API.get(PORT + `/projects/${id}/create_schedule`, {params});
export const createattendances = (projectid) =>
  API.post(PORT + '/attendances', projectid);
export const gettutees = (params) =>
  API.get(PORT + '/auths/show_all', {params});
export const gettutorprojs = () => API.get(PORT + '/get_project_list');
export const paymentstatus = (params) =>
  API.patch(PORT + `/attendances`, params);
export const createlike = (params) => API.post(PORT + '/likes', params);
export const deletelike = (id) => API.delete(PORT + `/likes/${id}`);
export const islike = (params) => API.get(PORT + `/likes/is_like`, {params});
export const getlikes = () => API.get(PORT + '/likes');
export const getcurrentuser = () => API.get(PORT + '/get_current_user');
export const tutorgetproject = (params) =>
  API.get(PORT + '/projects', {params});
export const deleteproject = (projectid) =>
  API.delete(PORT + `/projects/${projectid}`);
export const quitproject = (params) =>
  API.delete(PORT + '/attendances', {params});
export const getPlan = (params) => API.get(PORT + '/options', {params});
export const submitauth = (formData) =>
  FORMAPI.post(PORT + '/auths/', formData);
export const projectrefund = (params) =>
  API.get(PORT + `/projects/refund`, {params});
export const getmylikes = () => API.get(PORT + '/users/mylikes');
export const getbookforproject = (id) => API.get(PORT + `/books/${id}`);
export const appleLogin = (params) => API.get(PORT + '/apple/login', {params});
export const userUpdate = (id, {user}) =>
  API.patch(PORT + `/users/${id}`, {user});
export const userImageUpdate = (id, user) =>
  FORMAPI.patch(PORT + `/users/${id}`, user);
export const tuteeauthconfirm = (authid, params) =>
  API.patch(PORT + `/auths/${authid}`, params);
