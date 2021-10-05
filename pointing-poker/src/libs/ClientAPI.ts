import { URL, FETCH_ERROR } from '../constants';
import { IUser } from '../interfaces';
import { getUserFormData } from '../utils';

type RequestOptions = {
  method: string;
  body: BodyInit;
};

class ClientAPI {
  private async request(endpoint: string, { method, body }: RequestOptions) {
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    };

    try {
      const response = await fetch(`${URL}${endpoint}`, config);
      const data = await response.json();

      return data;
    } catch (err) {
      return Promise.reject(new Error(FETCH_ERROR));
    }
  }

  public async get(endpoint: string, body?: object) {
    return await this.request(endpoint, { method: 'GET', body: JSON.stringify(body) });
  }

  public async post(endpoint: string, body: object) {
    return await this.request(endpoint, { method: 'POST', body: JSON.stringify(body) });
  }

  public async postUserData(endpoint: string, body: Omit<IUser, 'id' | 'gameId'>) {
    const userFormData = getUserFormData(body);
    try {
      const response = await fetch(`${URL}${endpoint}`, { method: 'POST', body: userFormData });
      const data = await response.json();

      return data;
    } catch (err) {
      return Promise.reject(new Error(FETCH_ERROR));
    }
  }

  public async put(endpoint: string, body?: object) {
    return await this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  }

  public async delete(endpoint: string, body?: object) {
    return await this.request(endpoint, { method: 'DELETE', body: JSON.stringify(body) });
  }
}

const clientAPI = new ClientAPI();

export { clientAPI };
