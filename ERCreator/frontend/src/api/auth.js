import instance from "./instance";

export const signIn = (username, password) => {
  return instance.post("/api/token/", {
    username: username,
    password: password,
  });
};
