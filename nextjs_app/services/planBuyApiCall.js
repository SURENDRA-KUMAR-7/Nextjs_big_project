import { httpAxios } from "./httpAxios";

// call api for Plan Buy
export async function planBuy(plan){
  const result = await httpAxios.post("/api/planbuyapi",plan).then((response) => response.data);
  return result;
}