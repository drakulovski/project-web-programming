import { AxiosService } from '../config';
import { Endpoints } from '../endpoints';
import { IUser } from '../../models/Models';

export interface IUserLoginParams extends IUser {
  password: string;
}

export interface IUserSignUpParams extends IUser {
  password: string;
  role: Array<string>;
}

interface ILoginResponse extends IUser {
  accessToken: string;
  roles: Array<string>;
}

export class AuthApi {
  constructor(private axios: AxiosService) {}

  signIn = async (params: IUserLoginParams) => {
    const response = await this.axios
      .post<ILoginResponse>(Endpoints.signIn, params)
      .then((response: ILoginResponse) => {
        const isAdmin = response.roles.some((x) => x === 'ROLE_ADMIN');
        localStorage.setItem('authToken', response.accessToken);
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: response.id,
            username: response.username,
            email: response.email,
            role: response.roles,
            isAdmin,
          })
        );
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  };

  signUp = async (params: IUserSignUpParams) => {
    const reponse = await this.axios.post<IUserLoginParams>(
      Endpoints.signUp,
      params
    );
    return reponse;
  };
}
