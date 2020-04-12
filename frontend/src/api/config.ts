import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
export const BASE_PATH = `http://localhost:8080/api/`;
const AUTH = 'authToken';

export class AxiosService {
  instance: AxiosInstance = axios.create({
    baseURL: BASE_PATH,
  });

  constructor() {
    this.instance.interceptors.request.use((request) => {
      const currentToken = localStorage.getItem(AUTH);
      if (currentToken) {
        request.headers['Authorization'] = `Bearer ${currentToken}`;
      }
      return request;
    });
  }

  get<T>(
    url: string,
    params?: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.instance
      .get(url, { params, ...config })
      .then(({ data }) => data)
      .catch((error) => this.errorHandling(error));
  }

  post<T>(
    url: string,
    params?: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.instance
      .post(url, params, config)
      .then(({ data }) => data)
      .catch((error) => this.errorHandling(error));
  }

  delete<T>(
    url: string,
    params?: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.instance
      .delete(url, config)
      .then(({ data }) => data)
      .catch(this.errorHandling);
  }

  put<T>(
    url: string,
    params: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.instance
      .put(url, params, config)
      .then(({ data }) => data)
      .catch(this.errorHandling);
  }

  errorHandling: (response: any) => Promise<Error> = ({ response }) => {
    const { status, data } = response;

    if (status >= 200 && status <= 299) {
      return data;
    }

    const errorData = data.data;
    const { message, status: code } = data;
    throw new Error(code, message, errorData);
  };
}

export class Error {
  code: number;
  title: string;
  message: string | any;
  constructor(code: number, title: string, message: string | any) {
    this.code = code;
    this.title = title;
    this.message = message;
  }
}
