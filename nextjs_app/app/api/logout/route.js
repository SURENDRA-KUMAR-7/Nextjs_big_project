import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req){
    let result;
    try{
        const response = NextResponse.json({success:true,message:"Logout Successfully",url:req.url},{status:200});
        response.cookies.set("authToken",'',{ secure: true, httpOnly: true});
        return response;
    }catch(err){
        console.log(err.message);
        result = {success:false, message:"Somethig went wrog"};
        return NextResponse.json(result);
    }finally{
        await mongoose.connection.close();
    }
}
