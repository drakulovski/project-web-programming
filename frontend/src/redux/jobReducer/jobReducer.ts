import { Action } from 'redux';
import { isType } from 'ts-action';
import { GetJob, GetJobs, JobsFetching, JobsErrors, PostJob } from '../actions';
import { IJob, IBaseReduxState } from '../../Models/Models';
interface IJobReducer extends IBaseReduxState {
  data: IJob | IJob[];
  pageNo: number;
  totalElements: number;
  lastPage: number;
}

const initialState: IJobReducer = {
  data: [],
  pageNo: 0,
  totalElements: 0,
  lastPage: 0,
  error: {
    code: null,
    message: null,
  },
  isLoading: true,
};

export const jobReducer = (
  state = initialState,
  action: Action
): IJobReducer => {
  if (isType(action, GetJobs)) {
    const { payload } = action;
    return {
      ...state,
      data: payload.data,
      pageNo: payload.pageNo,
      lastPage: payload.lastPage,
      totalElements: payload.totalElements,
    };
  }
  if (isType(action, GetJob)) {
    const { payload } = action;
    return {
      ...state,
      data: [payload.job],
    };
  }
  if (isType(action, PostJob)) {
    const { payload } = action;
    return {
      ...state,
      data: payload,
    };
  }
  if (isType(action, JobsErrors)) {
    const { payload } = action;
    return {
      ...state,
      error: {
        code: payload.code,
        message: payload.message,
      },
    };
  }
  if (isType(action, JobsFetching)) {
    const { payload } = action;
    return {
      ...state,
      isLoading: payload,
    };
  }
  return state;
};
