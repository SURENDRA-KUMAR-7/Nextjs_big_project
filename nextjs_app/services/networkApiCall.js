"use client"
import { httpAxios } from "./httpAxios";

// call api for GET earnigs and Levels
export async function getEarnings(){
  const result = await httpAxios.get("/api/networkapi").then((response) => response.data);
  return result;
}
