import http from "./http-common";

class OrderDetailDataService {
  getAll() {
    return http.get("/orderDetails");
  }

  get(id) {
    return http.get(`/orderDetails/${id}`);
  }

  create(data) {
    return http.post("/orderDetails", data);
  }

  update(id, data) {
    return http.put(`/orderDetails/${id}`, data);
  }

  delete(id) {
    return http.delete(`/orderDetails/${id}`);
  }

  deleteAll() {
    return http.delete(`/orderDetails`);
  }
}

export default new OrderDetailDataService();