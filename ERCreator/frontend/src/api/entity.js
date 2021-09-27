import instance from "./instance";

export const createEntity = (payload) => {
  return instance.post("/api/entity/", payload);
};

export const updateEntity = (payload) => {
  return instance.put(`/api/entity/${payload.id}/`, payload);
};

export const deleteEntity = (id) => {
  return instance.delete(`/api/entity/${id}`);
};

export const changePosition = (id, positionX, positionY) => {
    return instance.post(`/api/entity/${id}/change_position/`, {
        positionX: positionX,
        positionY: positionY
    });
};
