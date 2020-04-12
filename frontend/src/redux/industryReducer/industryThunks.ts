import { Dispatch } from 'redux';
import {
  IndustriesErrors,
  GetIndustries,
  GetIndustry,
  IndustriesFetching,
} from '../actions';
import { API } from '../../api';

export type getIndustriesActions =
  | ReturnType<typeof GetIndustries>
  | ReturnType<typeof IndustriesErrors>
  | ReturnType<typeof IndustriesFetching>;

export const getIndustries = () => async (
  dispatch: Dispatch<getIndustriesActions>
) => {
  dispatch(IndustriesFetching(true));
  try {
    const response = await API.Industry.getIndustries();
    dispatch(GetIndustries(response));
  } catch (error) {
    dispatch(IndustriesErrors({ code: error.code, message: error.message }));
  } finally {
    dispatch(IndustriesFetching(false));
  }
};

export type getIndustryActions =
  | ReturnType<typeof GetIndustry>
  | ReturnType<typeof IndustriesErrors>
  | ReturnType<typeof IndustriesFetching>;

export const getIndustry = (id: number) => async (
  dispatch: Dispatch<getIndustryActions>
) => {
  dispatch(IndustriesFetching(true));
  try {
    const response = await API.Industry.getIndustry(id);
    dispatch(GetIndustry(response));
  } catch (error) {
    dispatch(IndustriesErrors({ code: error.code, message: error.message }));
  } finally {
    dispatch(IndustriesFetching(false));
  }
};

export type deleteIndustryActions =
  | ReturnType<typeof GetIndustry>
  | ReturnType<typeof IndustriesErrors>
  | ReturnType<typeof IndustriesFetching>;

export const deleteIndustry = (id: number) => async (
  dispatch: Dispatch<deleteIndustryActions>
) => {
  dispatch(IndustriesFetching(true));
  try {
    const response = await API.Industry.deleteIndustry(id);
  } catch (error) {
    dispatch(IndustriesErrors({ code: error.code, message: error.message }));
  } finally {
    dispatch(IndustriesFetching(false));
  }
};

export type putIndustryActions =
  | ReturnType<typeof GetIndustry>
  | ReturnType<typeof IndustriesErrors>
  | ReturnType<typeof IndustriesFetching>;

export const putIndustry = (id: number) => async (
  dispatch: Dispatch<putIndustryActions>
) => {
  dispatch(IndustriesFetching(true));
  try {
    const response = await API.Industry.putIndustry(id);
  } catch (error) {
    dispatch(IndustriesErrors({ code: error.code, message: error.message }));
  } finally {
    dispatch(IndustriesFetching(false));
  }
};
