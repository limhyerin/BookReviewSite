const SET_USERINFO = 'authReducer/SET_USERINFO';
const SET_ISLOGGED = 'authReducer/SET_ISLOGGED';
const UPDATE_PROFILE = 'authReducer/UPDATE_PROFILE';
const UPDATE_NICKNAME = 'authReducer/UPDATE_NICKNAME';

export const setUserInfo = (payload) => {
  return {
    type: SET_USERINFO,
    payload
  };
};
export const setIsLogged = (payload) => {
  return {
    type: SET_ISLOGGED,
    payload
  };
};
export const updateProfile = (payload) => {
  return {
    type: UPDATE_PROFILE,
    payload
  };
};
export const updateNickname = (payload) => {
  return {
    type: UPDATE_NICKNAME,
    payload
  };
};

const data = {
  userInfo: {},
  isLogged: false
};

const authReducer = (state = data, action) => {
  switch (action.type) {
    case SET_USERINFO:
      return { ...state, userInfo: { ...action.payload } };
    case SET_ISLOGGED:
      return { ...state, isLogged: action.payload };
    case UPDATE_PROFILE:
      return { ...state, userInfo: { ...state.userInfo, profile: action.payload } };
    case UPDATE_NICKNAME:
      return { ...state, userInfo: { ...state.userInfo, nickname: action.payload } };
    default:
      return state;
  }
};

export default authReducer;
