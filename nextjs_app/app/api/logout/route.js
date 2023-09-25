import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req){
    let result;
    try{
        const url = await req
        const response = NextResponse.json({success:true,message:"Logout Successfully"},{status:200});
        response.cookies.set("authToken",'  ',{ secure: true, httpOnly: true});
        return response;
    }catch(err){
        // console.log();
        result = {success:false, message:err.message};
        return NextResponse.json(result);
    }finally{
        await mongoose.connection.close();
    }
}
