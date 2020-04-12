import { Dispatch } from 'redux';
import {
  CategoriesErrors,
  GetCategories,
  GetCategory,
  CategoriesFetching,
} from '../actions';
import { API } from '../../api';

export type getCategoriesActions =
  | ReturnType<typeof GetCategories>
  | ReturnType<typeof CategoriesErrors>
  | ReturnType<typeof CategoriesFetching>;

export const getCategories = () => async (
  dispatch: Dispatch<getCategoriesActions>
) => {
  dispatch(CategoriesFetching(true));
  try {
    const response = await API.Category.getCategories();
    dispatch(GetCategories(response));
  } catch (error) {
    dispatch(CategoriesErrors({ code: error.code, message: error.message }));
  } finally {
    dispatch(CategoriesFetching(false));
  }
};

export type getCategoryActions =
  | ReturnType<typeof GetCategory>
  | ReturnType<typeof CategoriesErrors>
  | ReturnType<typeof CategoriesFetching>;

export const getCategory = (id: number) => async (
  dispatch: Dispatch<getCategoryActions>
) => {
  dispatch(CategoriesFetching(true));
  try {
    const response = await API.Category.getCategory(id);
    dispatch(GetCategory(response));
  } catch (error) {
    dispatch(CategoriesErrors({ code: error.code, message: error.message }));
  } finally {
    dispatch(CategoriesFetching(false));
  }
};

export type deleteCategoryActions =
  | ReturnType<typeof GetCategory>
  | ReturnType<typeof CategoriesErrors>
  | ReturnType<typeof CategoriesFetching>;

export const deleteCategory = (id: number) => async (
  dispatch: Dispatch<deleteCategoryActions>
) => {
  dispatch(CategoriesFetching(true));
  try {
    const response = await API.Category.deleteCategory(id);
  } catch (error) {
    dispatch(CategoriesErrors({ code: error.code, message: error.message }));
  } finally {
    dispatch(CategoriesFetching(false));
  }
};

export type putCategoryActions =
  | ReturnType<typeof GetCategory>
  | ReturnType<typeof CategoriesErrors>
  | ReturnType<typeof CategoriesFetching>;

export const putCategory = (id: number) => async (
  dispatch: Dispatch<putCategoryActions>
) => {
  dispatch(CategoriesFetching(true));
  try {
    const response = await API.Category.putCategory(id);
  } catch (error) {
    dispatch(CategoriesErrors({ code: error.code, message: error.message }));
  } finally {
    dispatch(CategoriesFetching(false));
  }
};
