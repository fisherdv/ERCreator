import instance from "./instance";

export const getERModels = (page = 1) => {
  return instance.get("/api/er_models/", {
    params: {
      page: page,
    },
  });
};

export const createERModels = (payload) => {
  return instance.post("/api/er_models/", payload);
};

export const updateERModels = (payload) => {
  return instance.put(`/api/er_models/${payload.id}/`, {
    name: payload.name,
    comment: payload.comment,
    entities: payload.entities,
  });
};

export const deleteERModels = (id) => {
  return instance.delete(`/api/er_models/${id}`);
};
