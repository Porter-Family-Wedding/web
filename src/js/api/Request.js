import store from 'store';

function RequestException(message) {
  this.message = message;
  this.name = 'RequestException';
}

export default class Request {
  constructor(endpoint, auth = false, calls = ['list', 'getById', 'create', 'update', 'remove', 'listForAccount']) {
    this.endpoint = endpoint;
    this.calls = calls;
    this.auth = auth;
  }

  static request = async (method, endpoint, data = {}, auth = false) => {
    try {
      const authHeader = auth ? `Bearer ${store.get('token')}` : '';

      const options = {
        method,
        headers: {
          Authorization: authHeader,
          'Cache-Control': 'max-age=120',
          'Content-Type': 'application/json',
        },
      };

      if (Object.keys(data).length) options.body = JSON.stringify(data);

      const resp = await fetch(`${globals.API_URL}${endpoint}`, options);

      const json = await resp.json();

      if (resp.status >= 400) {
        throw json;
      }

      return json;
    } catch (err) {
      throw new RequestException(err);
    }
  }

  list = (auth = false) => {
    if (this.calls.includes('list')) {
      return Request.request('GET', this.endpoint, {}, this.auth || auth);
    }
    throw new RequestException('ListNotValid');
  }

  get = (id, auth = false) => {
    if (this.calls.includes('getById')) {
      return Request.request('GET', `${this.endpoint}/${id}`, {}, this.auth || auth);
    }
    throw new RequestException('getByIdNotValid');
  }

  create = (data, auth = false) => {
    if (this.calls.includes('create')) {
      return Request.request('POST', this.endpoint, data, this.auth || auth);
    }
    throw new RequestException('CreateNotValid');
  }

  remove = (id, auth = false) => {
    if (this.calls.includes('remove')) {
      return Request.request('DELETE', `${this.endpoint}/${id}`, {}, this.auth || auth);
    }
    throw new RequestException('RemoveNotValid');
  }

  update = (id, data, auth = false) => {
    if (this.calls.includes('update')) {
      return Request.request('PUT', `${this.endpoint}/${id}`, data, this.auth || auth);
    }
    throw new RequestException('UpdateNotValid');
  }
}