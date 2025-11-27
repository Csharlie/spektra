import axios, { AxiosInstance } from 'axios';

export class WordPressRestClient {
  private client: AxiosInstance;

  constructor(baseURL: string, authToken?: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
    });
  }

  async getPosts(params = {}) {
    const response = await this.client.get('/posts', { params });
    return response.data;
  }

  async getPost(id: number | string) {
    const response = await this.client.get(`/posts/${id}`);
    return response.data;
  }

  async getPages(params = {}) {
    const response = await this.client.get('/pages', { params });
    return response.data;
  }

  async getPage(id: number | string) {
    const response = await this.client.get(`/pages/${id}`);
    return response.data;
  }

  async getCategories(params = {}) {
    const response = await this.client.get('/categories', { params });
    return response.data;
  }
}
