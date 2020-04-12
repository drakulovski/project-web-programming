import { AxiosService } from '../config';
import { Endpoints } from '../endpoints';
import { IJob, IGetJobs, IGetJob, IGetJobsParams } from '../../models/Models';

export class JobApi {
  constructor(private axios: AxiosService) {}

  getJobs = async (params?: IGetJobsParams) => {
    const response = await this.axios.get<IGetJobs>(Endpoints.getJobs, params);
    return response;
  };

  getJob = async (id: number) => {
    const response = await this.axios.get<IGetJob>(Endpoints.getJob(id));
    return response;
  };

  postJob = async (params?: IJob) => {
    const reponse = await this.axios.post<IJob>(Endpoints.postJobs, params);
    return reponse;
  };

  putJob = async (id: number, params?: IJob) => {
    const reponse = await this.axios.put<IJob>(Endpoints.putJob(id), params);
    return reponse;
  };

  deleteJob = async (id: number) => {
    const reponse = await this.axios.delete<IJob>(Endpoints.deleteJob(id));
    return reponse;
  };
}
