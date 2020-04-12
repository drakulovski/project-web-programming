import { Action } from 'redux';
import { isType } from 'ts-action';
import {
  GetCategory,
  GetCategories,
  CategoriesFetching,
  CategoriesErrors,
} from '../actions';
import { ICategory, IBaseReduxState } from '../../Models/Models';
interface ICategoryReducer extends IBaseReduxState {
  data: ICategory | ICategory[];
}

const initialState: ICategoryReducer = {
  data: [],
  error: {
    code: null,
    message: null,
  },
  isLoading: false,
};

export const categoryReducer = (
  state = initialState,
  action: Action
): ICategoryReducer => {
  if (isType(action, GetCategories)) {
    const { payload } = action;
    return {
      ...state,
      data: payload.categoryList,
    };
  }
  if (isType(action, GetCategory)) {
    const { payload } = action;
    return {
      ...state,
      data: payload,
    };
  }
  if (isType(action, CategoriesErrors)) {
    const { payload } = action;
    return {
      ...state,
      error: {
        code: payload.code,
        message: payload.message,
      },
    };
  }
  if (isType(action, CategoriesFetching)) {
    const { payload } = action;
    return {
      ...state,
      isLoading: payload,
    };
  }
  return state;
};
