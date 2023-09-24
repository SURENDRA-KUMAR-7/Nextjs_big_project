import { httpAxios } from "./httpAxios";

export async function LoginUser(user){
  const result = await httpAxios.post("/api/login",user).then((response) => response.data);
  return result;
}

export async function LogoutUser(){
  const result = await httpAxios.get("/api/logout").then((response) => response.data);
  return result;
}