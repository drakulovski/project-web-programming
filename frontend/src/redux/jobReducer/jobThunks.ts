import { Dispatch } from 'redux';
import { JobsErrors, GetJobs, GetJob, JobsFetching, PostJob } from '../actions';
import { API } from '../../api';
import { IJob, IGetJobsParams } from '../../Models/Models';

export type getJobsActions =
  | ReturnType<typeof GetJobs>
  | ReturnType<typeof JobsErrors>
  | ReturnType<typeof JobsFetching>;

export const getJobs = (params?: IGetJobsParams) => async (
  dispatch: Dispatch<getJobsActions>
) => {
  dispatch(JobsFetching(true));
  try {
    const response = await API.Job.getJobs(params);
    dispatch(GetJobs(response));
    return response;
  } catch (error) {
    dispatch(JobsErrors({ code: error.code, message: error.message }));
    throw new Error();
  } finally {
    dispatch(JobsFetching(false));
  }
};

export type getJobActions =
  | ReturnType<typeof GetJob>
  | ReturnType<typeof JobsErrors>
  | ReturnType<typeof JobsFetching>;

export const getJob = (id: number) => async (
  dispatch: Dispatch<getJobActions>
) => {
  dispatch(JobsFetching(true));
  try {
    const response = await API.Job.getJob(id);
    dispatch(GetJob(response));
  } catch (error) {
    dispatch(JobsErrors({ code: error.code, message: error.message }));
  } finally {
    dispatch(JobsFetching(false));
  }
};

export type postJobActions =
  | ReturnType<typeof PostJob>
  | ReturnType<typeof JobsErrors>
  | ReturnType<typeof JobsFetching>;

export const postJob = (params: IJob) => async (
  dispatch: Dispatch<postJobActions>
) => {
  dispatch(JobsFetching(true));
  try {
    const response = await API.Job.postJob();
    dispatch(PostJob(response));
  } catch (error) {
    dispatch(JobsErrors({ code: error.code, message: error.message }));
  } finally {
    dispatch(JobsFetching(false));
  }
};

export type deleteJobActions =
  | ReturnType<typeof GetJob>
  | ReturnType<typeof JobsErrors>
  | ReturnType<typeof JobsFetching>;

export const deleteJob = (id: number) => async (
  dispatch: Dispatch<deleteJobActions>
) => {
  dispatch(JobsFetching(true));
  try {
    const response = await API.Job.deleteJob(id);
    return response;
  } catch (error) {
    dispatch(JobsErrors({ code: error.code, message: error.message }));
  } finally {
    dispatch(JobsFetching(false));
  }
};

export type putJobActions =
  | ReturnType<typeof GetJob>
  | ReturnType<typeof JobsErrors>
  | ReturnType<typeof JobsFetching>;

export const putJob = (id: number) => async (
  dispatch: Dispatch<putJobActions>
) => {
  dispatch(JobsFetching(true));
  try {
    const response = await API.Job.putJob(id);
    return response;
  } catch (error) {
    dispatch(JobsErrors({ code: error.code, message: error.message }));
  } finally {
    dispatch(JobsFetching(false));
  }
};
