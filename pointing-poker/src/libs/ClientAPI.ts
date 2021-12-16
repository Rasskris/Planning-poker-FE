import { URL, FETCH_ERROR } from '../constants';

class ClientAPI {
  private async request(endpoint: string, { method, body }: RequestInit) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    };

    try {
      const response = await fetch(`${URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ? data.message : FETCH_ERROR);
      }

      return data;
    } catch (error: any) {
      return Promise.reject(error.message ? error.message : null);
    }
  }

  public async get(endpoint: string, body?: object) {
    return await this.request(endpoint, { method: 'GET', body: JSON.stringify(body) });
  }

  public async post(endpoint: string, body?: object) {
    return await this.request(endpoint, { method: 'POST', body: JSON.stringify(body) });
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
