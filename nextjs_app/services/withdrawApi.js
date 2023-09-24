import { httpAxios } from "./httpAxios";

// call api for SAVE withdraw data
export async function savePaymentRequest(upidata){
  const result = await httpAxios.post("/api/withdrapi",upidata).then((response) => response.data);
  return result;
}


// call api for GET withdraw data
export async function getPaymentRequest(){
  const result = await httpAxios.get("/api/withdrapi").then((response) => response.data);
  return result;
}