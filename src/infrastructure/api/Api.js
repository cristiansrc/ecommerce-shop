export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(url) {
    return this.fetch('GET', url);
  }

  post(url, body) {
    return this.fetch('POST', url, body);
  }

  patch(url, body) {
    return this.fetch('PATCH', url, body);
  }

  put(url, body) {
    return this.fetch('PUT', url, body);
  }

  delete(url, body) {
    return this.fetch('DELETE', url, body);
  }

  async fetch(method, url, body) {
    try {
      
      const options = {
        method,
        headers: {
          
        },
      };
      if (body) {
        options.body = JSON.stringify( body );
        options.headers['Content-Type'] = 'application/json';
      }
      const res = await fetch(this.baseUrl + url, options);
      if (res.status === 401 || res.status === 403) {
        return null;
      }
      if (!res.headers.get('Content-Type').includes('application/json')) {
        return { data: null, error: true };
      }
      const { data, error } = await res.json();
      if (!data) {
        return { data: null, error: error || true };
      }
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }
}