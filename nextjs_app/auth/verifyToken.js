import { jwtVerify } from "jose";

// get jwt secret key function
export const getJwtSecretKey = () => {
    const secret = process.env.JWT_SECRET;
    if(!secret || secret.length === 0){
        throw new Error("The enviroment variable JWT_SECRET is not set.")}
    return secret
}

// verify token function
export async function verifyAuth(token){
    let verified;
    try{
       const userData = await jwtVerify(token.toString(), new TextEncoder().encode(getJwtSecretKey()));
       if(userData){
           verified = {userId:userData.payload.id, userName:userData.payload.name, success: true}
            return verified;
       }else{
        verified = {success:false,userData:null,erro:"in token no data"};
        return verified;
       }
      }catch(error){
        verified = {success:false,userData:null,erro:error.message};
        return verified;
      }
}
