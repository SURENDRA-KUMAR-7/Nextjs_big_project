import connectToMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/auth/verifyToken";

// token
const creatToken = async(data)=>{
   const tokenn = await new SignJWT(data).setProtectedHeader({alg: 'HS256'}).setJti(nanoid()).setIssuedAt().setExpirationTime('1h').sign(new TextEncoder().encode(getJwtSecretKey()))
   return tokenn
}

// POST Request
export async function POST(req) {
    let result;
    try{
    const {phone, password} = await req.json();
    await connectToMongoDB();
   let user = await User.findOne({ 'phone': phone.toString()},["phone","password"]);
   if (user) {
       let isMatched = bcrypt.compareSync(password.toString(), user.password);
    if(phone.toString() == user.phone && isMatched){
        // let token = Jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET);
       const token = await creatToken({id: user._id, name: user.name});
        result = {success:true};
        const response = NextResponse.json({result},{status:200});
        response.cookies.set("authToken",token,{ secure: true, httpOnly: true});
        
        return response;
        // expires:new Date(Date.now() + 60000),
    }else{
        result = {success:false,error:"Invalid Credentials!"};}
   }else{
    result = {success:false,error:"Invalid Credentials!"};
   }
       return NextResponse.json({result},{status:200});
    }catch(err){
        console.log(err.message);
        result = {error:"Something went wrong!",err: err.message,success:false};
        return NextResponse.json({result},{status:400});
    }
}