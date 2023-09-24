import { httpAxios } from "./httpAxios";

export async function saveHelp(user){
  const result = await httpAxios.post("/api/supportapi",user).then((response) => response.data);
  return result;
}