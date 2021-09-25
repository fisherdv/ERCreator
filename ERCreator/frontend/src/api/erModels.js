import instance from "./instance";

export const getERModels = () => {
  return instance.get("/api/er_models/");
};
