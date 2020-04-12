import { Action } from 'redux';
import { isType } from 'ts-action';
import {
  GetIndustry,
  GetIndustries,
  IndustriesFetching,
  IndustriesErrors,
} from '../actions';
import { IIndustry, IBaseReduxState } from '../../Models/Models';
interface IIndustryReducer extends IBaseReduxState {
  data: IIndustry | IIndustry[];
}

const initialState: IIndustryReducer = {
  data: [],
  error: {
    code: null,
    message: null,
  },
  isLoading: false,
};

export const industryReducer = (
  state = initialState,
  action: Action
): IIndustryReducer => {
  if (isType(action, GetIndustries)) {
    const { payload } = action;
    return {
      ...state,
      data: payload.industryList,
    };
  }
  if (isType(action, GetIndustry)) {
    const { payload } = action;
    return {
      ...state,
      data: payload,
    };
  }
  if (isType(action, IndustriesErrors)) {
    const { payload } = action;
    return {
      ...state,
      error: {
        code: payload.code,
        message: payload.message,
      },
    };
  }
  if (isType(action, IndustriesFetching)) {
    const { payload } = action;
    return {
      ...state,
      isLoading: payload,
    };
  }
  return state;
};
