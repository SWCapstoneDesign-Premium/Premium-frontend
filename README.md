# 2021 Capstone Premium Team Frontend



# About Premium frontend

<div align="center">
  
  <img src="https://user-images.githubusercontent.com/59689327/120321478-5193ad80-c31e-11eb-8b14-ae691d2eb604.PNG" width="200" height="200">
  <img src="https://user-images.githubusercontent.com/59689327/120321485-52c4da80-c31e-11eb-8ea1-7fcc63ea8aca.PNG" width="200" height="200">
</div>
  
- [About 따숲](https://www.ddasup.ga)
- [따숲 관리자 페이지](https://www.ddasup.ga/admin)

 



## 1. Contributer

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/rohguentak76"><img src="https://avatars.githubusercontent.com/u/52411864?v=4?s=200" width="200px;" alt=""/><br /><sub><b>guentak Roh</b></sub></a><br /><sub>Frontend developer</sub></td>
    <td align="center"><a href="https://github.com/mlsh1112"><img src="https://avatars.githubusercontent.com/u/59257758?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Seohyun Lee</b></sub></a><br /><sub>Frontend developer</sub></td>
  <td align="center"><a href="https://github.com/kimhwangdae"><img src="https://avatars.githubusercontent.com/u/59689327?v=4?s=200" width="200px;" alt=""/><br /><sub><b>hwnagdae Kim</b></sub></a><br /><sub>Frontend developer</sub></td>

  </tr>
</table>






## 2. 개발 환경

```bash
 - react-native-cli : 2.0.1
 - react-native : 0.63.4
 - npm : 6.14.11
 - node.js : 14.16.0
 - target SDK : 29
 - react-native-webview: "^11.6.2"
 - buildToolsVersion = "29.0.3"
 - minSdkVersion = 21 
 - compileSdkVersion = 29
 - targetSdkVersion = 29
 - kotlinVersion = '1.3.72
 ```



## 3. 기능 소개

우리는 공부를 비교적 잘하는 멘토들이 공부에 어려움을 겪거나 발전을 원하는 튜티들을 자신이 공부했던 패턴에 따라 학습시키며,  
튜티들이 해당 패턴에 적응하여, 성적향상을 이루고, 프로젝트 이후 자기주도학습으로 유도해주는 프로젝트를 구상하였습니다.
때문에 따라하는 스터디 프로젝트라고 하여 프로젝트명은 따숲입니다.

1. 튜터들은 프로젝트 생성 시, 튜티들을 공부시킬 책을 선정하고 여러 옵션에 따라 일정을 자동적으로 생성해줍니다.

   - 일정은 에빙하우스의 망각곡선을 분석하여 전날 공부했던 내용을 복습 강도를 설정하여 복습과 학습의 비율을 조정할 수 있다.
   - 일정은 책의 목차에 튜터들이 가중치를 입력하게 되면, 이에 따라 프로젝트 기간내에서 각 가중치 비율에 맞게 각 목차의 학습일정이 분산됩니다.
   - 일정은 튜터가 휴식 옵션을 부여할 수 있어서 유연하게 튜티들에게 휴식을 부여할 수 있습니다.
   - 튜터의 편의를 위해 책 검색 api를 제공하여 책을 검색할 수 있게 하였고, 이에 대한 목차를 크롤링하는 기능을 구현했습니다.

2. 튜터들이 프로젝트를 만들면, 튜티들은 체험기간 동안 프로젝트를 체험할 수 있게됩니다.

   - 튜터들의 프로필을 확인하고 프로젝트를 선택해도 튜티 자신과는 맞지 않을 수 있기에 체험기간을 부여합니다.

3. 체험기간이 끝나면 보증금을 내고 프로젝트에 정식으로 참여할 수 있습니다.

   - 보증금은 수업료가 아닌 공부에 동기를 부여하기 위한 방식으로 환급 정책에 따라 일정 비율 이상 일일공부인증을 하게 되면 전액 환급 받을 수 있습니다.

4. 프로젝트에 정식참여하게 되면, 튜티들은 각 일정에 맞는 공부를 한 뒤, 튜터가 지정한 방식으로 일일 인증을 수행해야합니다.

   - 일일 인증이란? 튜터의 편의성을 위하여 튜티들이 학습내용에 대해 사진을 찍어 업로드 할 수 있습니다.

5. 사용자들의 편의을 위해 소셜 로그인(애플, 카카오)기능을 구현하였고, 유저 정보의 보안을 지키기 위해 높을 보안성을 가지는 [jwt](https://jwt.io/) 방식을 차용하였습니다.

6. 서비스 관리자는 사용자들이 학교 인증을 하여 튜티자격을 요청하면, 이를 확인하고 튜터 자격을 부여할 수 있습니다.


## 4. Getting Started

1. 프로젝트 설치

```bash
# project download from git

$ git clone https://github.com/SWCapstoneDesign-Premium/Premium-frontend.git
```

2. API 설정

```bash
# 카카오 책 검색 Api key, backend 연동 설정
# in config.js

const baseurl = {
   port: "your local backend server ip",
   kakaotoken: 'your kakao api key',
};

export default baseurl;
```

3. local server 및 에뮬레이터에서 앱 실행

```bash
# download and set dependency
# install npm modules
npm install

# for ios
react-native run-ios

# for android
react-native run-android
```

4. 앱실행시 webview 관련 에러 발생 할 경우

```bash
# iamport dependency에 webview 중복 설치로 인한 에러 
# Invariant Violation: Tried to register two views with the same name RNCWebView

# iamport 모듈에 설치된 webview 삭제
rm node_modules/iamport-react-native/node_modules/react-native-webview

# 삭제 후 앱 재실행
```

