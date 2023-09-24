import { httpAxios } from "./httpAxios";

// call api for SAVE upi data
export async function saveUpiDetailes(upidata){
  const result = await httpAxios.post("/api/upiid",upidata).then((response) => response.data);
  return result;
}


// call api for GET upi data
export async function getUpiDetailes(){
  const result = await httpAxios.get("/api/upiid").then((response) => response.data);
  return result;
}