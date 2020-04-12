export interface IJob {
  id?: number;
  title: string;
  description: string;
  rate: number;
  available: boolean;
  qualifications: string;
  availableOnWeekends?: boolean;
  ratePerDay: boolean;
  location: string;
  company: boolean;
  category: ICategory;
  industry: IIndustry;
  user?: IUser;
}

export interface IGetJobs {
  data: IJob[];
  pageNo: number;
  totalElements: number;
  lastPage: number;
}

export interface IGetJobsParams {
  pageNo?: number;
  pageSize?: number;
  sortBy?: string;
}

export interface IGetJob {
  job: IJob;
}

export interface IUser {
  id?: number;
  role?: string[];
  username: string;
  email?: string;
}

export interface ICategory {
  id?: number;
  name: string;
}

export interface IGetCategories {
  categoryList: ICategory[];
}

export interface IGetIndustries {
  industryList: IIndustry[];
}

export interface IIndustry {
  id?: number;
  name: string;
}

export interface IError {
  code: number | null;
  message: string | null;
}

export interface IBaseReduxState {
  isLoading: boolean;
  error?: IError;
}
