import { URL } from '../constants';

type RequestOptions = {
  method: string;
  body: BodyInit;
};

class Loader {
  private async request(endpoint: string, { method, body }: RequestOptions) {
    const config = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    };

    try {
      const response = await fetch(`${URL}${endpoint}`, config);
      const data = await response.json();

      return data;
    } catch (err) {
      return Promise.reject(new Error(`Error`));
    }
  }

  public async get(endpoint: string, body?: object) {
    return await this.request(endpoint, { method: 'GET', body: JSON.stringify(body) });
  }

  public async post(endpoint: string, body?: object) {
    console.log(body);
    return await this.request(endpoint, { method: 'POST', body: JSON.stringify(body) });
  }

  public async put(endpoint: string, body?: object) {
    return await this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  }

  public async delete(endpoint: string, body?: object) {
    return await this.request(endpoint, { method: 'DELETE', body: JSON.stringify(body) });
  }
}

const loader = new Loader();

export { loader };
