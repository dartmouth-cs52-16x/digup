import axios from 'axios';
import { browserHistory } from 'react-router';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_USER: 'FETCH_USER',
  ERROR_MESSAGE: 'ERROR_MESSAGE',
};

const ROOT_URL = 'https://digup.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090';
const API_KEY = '?key=weijia_tang';

export function errorMessage(error) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_MESSAGE, message: error });
    browserHistory.push('/error');
  };
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
      dispatch({ type: ActionTypes.FETCH_POSTS, posts: response.data });
    }).catch(error => {
      dispatch(errorMessage(`Error fetching all posts: ${error.response.data}`));
    });
  };
}

export function createPost(post) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags };
    axios.post(`${ROOT_URL}/posts${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      dispatch({ type: ActionTypes.CREATE_POST, payload: { fields } });
      browserHistory.push('/');
    }).catch(error => {
      dispatch(errorMessage(`Error creating post: ${error.response.data}`));
    });
  };
}

export function updatePost(post, id) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags };
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      dispatch({ type: ActionTypes.UPDATE_POST, fields, id });
    }).catch(error => {
      dispatch(errorMessage(`Error updating post: ${error.response.data}`));
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      dispatch({ type: ActionTypes.FETCH_POST, post: response.data });
    }).catch(error => {
      dispatch(errorMessage(`Error fetching post: ${error.response.data}`));
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      dispatch({ type: ActionTypes.DELETE_POST, payload: null });
      browserHistory.push('/');
    }).catch(error => {
      dispatch(errorMessage(`Error deleting post: ${error.response.data}`));
    });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    browserHistory.push('/');
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.AUTH_ERROR });
    dispatch(errorMessage(error));
  };
}

export function signinUser({ email, password }) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}


export function signupUser({ email, password, username }) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username }).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

export function fetchUser() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/profile`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: {
        user: response.data,
      } });
    }).catch(error => {
      dispatch(errorMessage(`Cannot get user data: ${error.response.data}`));
    });
  };
}
