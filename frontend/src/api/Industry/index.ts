import { AxiosService } from '../config';
import { Endpoints } from '../endpoints';
import { IIndustry, IGetIndustries } from '../../models/Models';

export class IndustryApi {
  constructor(private axios: AxiosService) {}

  getIndustries = async () => {
    const response = await this.axios.get<IGetIndustries>(
      Endpoints.getIndustries
    );
    return response;
  };

  getIndustry = async (id: number) => {
    const response = await this.axios.get<IIndustry>(Endpoints.getIndustry(id));
    return response;
  };

  postIndustry = async (params?: IIndustry) => {
    const reponse = await this.axios.post<IIndustry>(
      Endpoints.postIndustries,
      params
    );
    return reponse;
  };

  putIndustry = async (id: number, params?: IIndustry) => {
    const reponse = await this.axios.put<IIndustry>(
      Endpoints.putIndustry(id),
      params
    );
    return reponse;
  };

  deleteIndustry = async (id: number) => {
    const reponse = await this.axios.delete<IIndustry>(
      Endpoints.deleteIndustry(id)
    );
    return reponse;
  };
}
