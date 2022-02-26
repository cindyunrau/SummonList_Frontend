import http from "../http-common";

const getAll = () => {
  return http.get("/creatures");
};

const get = id => {
  return http.get(`/creatures/${id}`);
};

const create = data => {
  return http.post("/creatures", data);
};

const update = (id, data) => {
  return http.put(`/creatures/${id}`, data);
};

const remove = id => {
  return http.delete(`/creatures/${id}`);
};

const removeAll = () => {
  return http.delete(`/creatures`);
};

const findByName = name => {
  return http.get(`/creatures?name=${name}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};