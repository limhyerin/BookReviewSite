const SET_REVIEW = 'SET_REVIEW';
const ADD_REVIEW = 'ADD_REVIEW';

export const setReview = (data) => {
  return {
    type: SET_REVIEW,
    payload: data
  };
};

export const addReview = (data) => {
  return {
    type: ADD_REVIEW,
    payload: data
  };
};

const initialState = {
  reviews: []
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEW:
      return {
        ...state,
        reviews: action.payload
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews]
      };
    default:
      return state;
  }
};

export default reviewsReducer;
