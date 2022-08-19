import http from "../http-common";

const getAll = () => {
  return http.get("/creature");
};

const getById = id => {
  return http.get(`/creature/id/${id}`);
};

const getByName = name => {
  return http.get(`/creature/name/${name}`);
};

const create = data => {
  return http.post("/creature/add", data);
};

const update = (id, data) => {
  return http.post(`/creature/update/${id}`, data);
};

const remove = id => {
  return http.delete(`/creature/${id}`);
};

const removeAll = () => {
  return http.delete(`/creature`);
};

const findByName = name => {
  return http.get(`/creature/search/name/${name}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getById,
  getByName,
  create,
  update,
  remove,
  removeAll,
  findByName
};