import * as Yup from 'yup';

export const Schema = Yup.object().shape({
  title: Yup.string()
    .min(5, '프로젝트 명이 너무 짧습니다.(최소 5글자 최대 30글자)')
    .max(30, '프로젝트 명이 너무 깁니다.(최소 2글자 최대 30글자)')
    .required('프로젝트 이름을 입력해주세요.'),
  startDate: Yup.date()
    .nullable()
    .required('프로젝트 시작 날짜를 기입해주세요.'),
  duration: Yup.number()
    .min(15, '프로젝트 최소 기간은 15일 이상입니다.')
    .required('올바른 프로젝트 기간을 정수 값으로 입력해주세요'),
  experienceduration: Yup.number()
    .min(1, '최소 체험기간은 1일 이상입니다.')
    .max(7, '최대 체험기간은 1주일입니다.')
    .required('체험기간을 입력해주세요.'),
  dailyStudyTime: Yup.number()
    .min(0, '일일 최소학습 시간을 설정해주세요.')
    .required('일일 최소학습 시간을 기입해주세요'),
  howToAuth: Yup.string()
    .min(5, '5글자 이상으로 인증 방식을 올바르게 기입해주세요.')
    .required('프로젝트 인증 방식을 기입해주세요.'),
  projectIntroduce: Yup.string()
    .min(
      5,
      '프로젝트 소개를 올바르게 기입해주세요. 소개문구는 최소 5글자 이상입니다. ',
    )
    .required('프로젝트 소개를 올바르게 기입해주세요.'),
  repeatstrength: Yup.number()
    .min(1, '최소 복습 강도는 1입니다.')
    .max(10, '최대 복습 강도는 10입니다.')
    .required('복습 강도를 입력해주세요'),
  deposit: Yup.number()
    .min(1000, '최소 금액은 1000원입니다.')
    .max(100000, '최대 금액은 10만원입니다.')
    .required('프로젝트 보증금을 입력해주세요.'),
});

const now = new Date();
export const tommorow = now.setDate(now.getDate() + 1);
