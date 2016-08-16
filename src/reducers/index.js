import { combineReducers } from 'redux';

import PostsReducer from './posts-reducer';
import AuthReducer from './auth-reducer';
import UserReducer from './user-reducer';
import ErrorReducer from './error-reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  profile: UserReducer,
  error: ErrorReducer,
});

export default rootReducer;
