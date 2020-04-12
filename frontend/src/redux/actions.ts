import { action, payload } from 'ts-action';
import {
  IJob,
  IError,
  ICategory,
  IIndustry,
  IGetJobs,
  IGetJob,
  IGetCategories,
  IGetIndustries,
} from '../models/Models';

export const GetJobs = action('GetJobs', payload<IGetJobs>());
export const GetJob = action('GetJob', payload<IGetJob>());
export const PostJob = action('PostJob', payload<IJob>());
export const JobsErrors = action('JobsErrors', payload<IError>());
export const JobsFetching = action('JobsFetching', payload<boolean>());
export const GetCategories = action('GetCategories', payload<IGetCategories>());
export const PostCategory = action('PostCategory', payload<ICategory>());
export const GetCategory = action('GetCategory', payload<ICategory>());
export const CategoriesErrors = action('CategoriesErrors', payload<IError>());
export const CategoriesFetching = action(
  'CategoriesFetching',
  payload<boolean>()
);
export const GetIndustries = action('GetIndustries', payload<IGetIndustries>());
export const GetIndustry = action('GetIndustry', payload<IIndustry>());
export const PostIndustry = action('PostIndustry', payload<IIndustry>());
export const IndustriesErrors = action('IndustriesErrors', payload<IError>());
export const IndustriesFetching = action(
  'CategoriesFetching',
  payload<boolean>()
);
