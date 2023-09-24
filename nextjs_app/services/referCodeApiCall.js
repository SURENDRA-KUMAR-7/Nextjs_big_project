import { httpAxios } from "./httpAxios";

// call api for get Refer code
export async function getReferCode(){
  const result = await httpAxios.get("/api/referapi").then((response) => response.data);
  return result;
}