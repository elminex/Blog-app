import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */

export const getPosts = ({ posts }) => posts.data;
export const getPost = ({ posts }) => posts.singlePost;
export const getPostsCount = ({ posts }) => posts.data.length;
export const getRequest = ({ posts }) => posts.request;
export const getPages = ({ posts }) => Math.ceil(posts.amount / posts.postsPerPage);

// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* ACTIONS */

export const START_REQUEST = createActionName('START_REQUEST');
export const END_REQUEST = createActionName('END_REQUEST');
export const LOAD_POSTS = createActionName('LOAD_POSTS');
export const LOAD_POST = createActionName('LOAD_POST');
export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const RESET_REQUEST = createActionName('RESET_REQUEST');
export const EDIT_POST = createActionName('EDIT_POST');
export const LOAD_POSTS_PAGE = createActionName('LOAD_POSTS_PAGE');
export const LOAD_VOTE = createActionName('LOAD_VOTE');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const loadPosts = payload => ({ payload, type: LOAD_POSTS });
export const loadPost = payload => ({ payload, type: LOAD_POST })
export const errorRequest = error => ({ error, type: ERROR_REQUEST });
export const resetRequest = () => ({ type: RESET_REQUEST });
export const loadPostsByPage = payload => ({ payload, type: LOAD_POSTS_PAGE });
export const loadVote = payload => ({ payload, type: LOAD_VOTE });


/* INITIAL STATE */

const initialState = {
  data: [],
  singlePost: {},
  amount: 0,
  postsPerPage: 10,
  presentPage: 1,
  request: {
    pending: false,
    error: null,
    success: null,
  }
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...statePart, data: action.payload };
    case LOAD_POST:
      return { ...statePart, singlePost: action.payload };
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: null } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };
    case RESET_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: null } };
    case LOAD_POSTS_PAGE:
      return {
        ...statePart,
        amount: action.payload.amount,
        postsPerPage: action.payload.postsPerPage,
        presentPage: action.payload.presentPage,
        data: [...action.payload.posts]
      }
      case LOAD_VOTE: 
      return { ...statePart, singlePost: { ...statePart.singlePost, votes: action.payload }}
    default:
      return statePart;
  }
};

/* THUNKS */

export const loadPostsRequest = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/posts`);
      dispatch(loadPosts(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadPostRequest = (id) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/posts/${id}`);
      dispatch(loadPost(res.data[0]));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const addPostRequest = (post) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      await axios.post(`${API_URL}/posts`, post);
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const editPostRequest = (post, id) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      await axios.post(`${API_URL}/posts/${id}`, { post: post, id: id });
      let res = await axios.get(`${API_URL}/posts/${id}`);
      dispatch(loadPost(res.data[0]));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadPostsByPageRequest = (page, postsPerPage) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      const startAt = (page - 1) * postsPerPage;
      const limit = postsPerPage;
      let res = await axios.get(`${API_URL}/posts/range/${startAt}/${limit}`);
      const payload = {
        posts: res.data.posts,
        amount: res.data.amount,
        postsPerPage,
        presentPage: page,
      };
      dispatch(loadPostsByPage(payload));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadRandomPostRequest = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/posts/random`);
      dispatch(loadPost(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const editAndLoadVotesRequest = (id, votes) => {
  return async dispatch => {
    try {
      await axios.post(`${API_URL}/posts/votes/${id}`, { votes: votes, id: id });
      let res = await axios.get(`${API_URL}/posts/${id}`);
      dispatch(loadVote(res.data[0].votes));
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  }
}