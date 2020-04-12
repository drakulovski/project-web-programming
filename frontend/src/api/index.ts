import { AxiosService } from './config';
import { JobApi } from './Job/index';
import { CategoryApi } from './Category';
import { IndustryApi } from './Industry';
import { AuthApi } from './Auth';

export class Api {
  axios = new AxiosService();
  Job = new JobApi(this.axios);
  Category = new CategoryApi(this.axios);
  Industry = new IndustryApi(this.axios);
  Auth = new AuthApi(this.axios);
}
export const API = new Api();
