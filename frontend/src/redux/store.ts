import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { jobReducer } from './jobReducer/jobReducer';
import { categoryReducer } from './categoryReducer/categoryReducer';
import { industryReducer } from './industryReducer/industryReducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
  job: jobReducer,
  category: categoryReducer,
  industry: industryReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const configureStore = () => {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middlewareEnhancer)
  );
  return store;
};
