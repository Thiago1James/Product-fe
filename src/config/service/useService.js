import Axios from "../axiosSetup";

class UserService {
  async register(body) {
    const data = await Axios.post("/users", body);
    return data;
  }

  async login(body) {
    const data = await Axios.post("/users/login", body);
    return data;
  }
}

export default new UserService();
