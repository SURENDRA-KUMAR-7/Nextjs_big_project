import { httpAxios } from "./httpAxios";

export async function SignupUser(user){
  const result = await httpAxios.post("/api/signup",user).then((response) => response.data);
  return result;
}