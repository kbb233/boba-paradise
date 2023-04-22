import http from "./http-common";

class OrderDetailDataService {
  getAll() {
    return http.get("/orderDetails");
  }

  get(data) {
    return http.get(`/orderDetails/`, data);
  }

  create(data) {
    return http.post("/orderDetails", data);
  }

  update(data) {
    return http.put(`/orderDetails/`, data);
  }

  delete(data) {
    return http.delete(`/orderDetails/deleteOne`, data);
  }

  deleteAll() {
    return http.delete(`/orderDetails`);
  }
}

export default new OrderDetailDataService();