const SET_AUTH = 'authReducer/SET_AUTH';

export const setAuth = (payload) => {
  return {
    type: SET_AUTH,
    payload
  };
};

const data = {
  userInfo: {}
};

const authReducer = (state = data, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        userInfo: { ...action.payload }
      };

    default:
      return state;
  }
};

export default authReducer;
