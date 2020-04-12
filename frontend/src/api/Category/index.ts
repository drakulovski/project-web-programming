import { AxiosService } from '../config';
import { Endpoints } from '../endpoints';
import { ICategory, IGetCategories } from '../../Models/Models';

export class CategoryApi {
  constructor(private axios: AxiosService) {}

  getCategories = async () => {
    const response = await this.axios.get<IGetCategories>(
      Endpoints.getCategories
    );
    return response;
  };

  getCategory = async (id: number) => {
    const response = await this.axios.get<ICategory>(Endpoints.getCategory(id));
    return response;
  };

  postCategory = async (params?: ICategory) => {
    const reponse = await this.axios.post<ICategory>(
      Endpoints.postCategories,
      params
    );
    return reponse;
  };

  putCategory = async (id: number, params?: ICategory) => {
    const reponse = await this.axios.put<ICategory>(
      Endpoints.putCategory(id),
      params
    );
    return reponse;
  };

  deleteCategory = async (id: number) => {
    const reponse = await this.axios.delete<ICategory>(
      Endpoints.deleteCategory(id)
    );
    return reponse;
  };
}
