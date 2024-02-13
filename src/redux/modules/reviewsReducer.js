const SET_REVIEW = 'SET_REVIEW';
const ADD_REVIEW = 'ADD_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';

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

export const updateReview = (id, data) => {
  return {
    type: UPDATE_REVIEW,
    payload: { id, data }
  };
};
export const deleteReview = (data) => {
  return {
    type: DELETE_REVIEW,
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
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review.id === action.payload.id ? { ...review, ...action.payload.data } : review
        )
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.payload)
      };
    default:
      return state;
  }
};

export default reviewsReducer;
