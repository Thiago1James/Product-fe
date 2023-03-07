import Axios from "../axiosSetup";

class ProductService {
  async findAll(page = 1) {
    const { data } = await Axios.get(`/products?page=${page}`);
    return data;
  }
  async findByName(nome) {
    const { data } = await Axios.get(`/products/${nome}`);
    return data;
  }

  async edit(params) {
    const { data } = await Axios.put(`/products/${params.id}`, params, {
      headers: { "x-access-token": params.token },
    });
    return data;
  }
  async create(params) {
    const { data } = await Axios.post(`/products`, params, {
      headers: { "x-access-token": params.token },
    });
    return data;
  }

  async delete(params) {
    const { data } = await Axios.delete(`/products/${params.id}`, {
      headers: { "x-access-token": params.token },
    });
    return data;
  }
}

export default new ProductService();
