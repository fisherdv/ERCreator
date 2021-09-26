import instance from "./instance";

export const getTypes = () => {
  return instance.get("/api/types/");
};
