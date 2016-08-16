import { ActionTypes } from '../actions';

const ErrorReducer = (state = { message: '' }, action) => {
  switch (action.type) {
    case ActionTypes.ERROR_MESSAGE:
      return { ...state, message: action.message };
    default:
      return state;
  }
};

export default ErrorReducer;
