import { httpAxios } from "./httpAxios";

// call api for SAVE bank data
export async function saveBankDetailes(upidata){
  const result = await httpAxios.post("/api/bankapi",upidata).then((response) => response.data);
  return result;
}


// call api for GET bank data
export async function getBankDetailes(){
  const result = await httpAxios.get("/api/bankapi").then((response) => response.data);
  return result;
}