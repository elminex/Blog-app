import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import posts from './postsRedux';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  posts
});

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
