import connectToMongoDB from "@/lib/mongodb";
import Support from "@/models/supportM";
import { NextResponse } from "next/server";

// POST Request
export async function POST(req) {
    let result;
    try{
    const {name, email, phoneNumber, reason} = await req.json();
    await connectToMongoDB();
    let isphone = await Support.findOne({ 'phoneNumber': phoneNumber.toString()});
    let isemail = await Support.findOne({ 'email': email.toString()});
    if(isphone != null || isemail != null){
        result = {error:"Your query Under Process!",success:false};
        return NextResponse.json(result,{status:200});
    }else{
        await Support.create({name:name.toString() , email:email.toString(), phoneNumber: phoneNumber,reason:reason.toString() });
        result = {success:true,message: "Your query Submited Successfuly!"};
        return NextResponse.json(result,{status:201});
    }
    
    }catch(err){
        result = {error:"Something went wrong",err,success:false};
        console.log(err.message);
        return NextResponse.json(result,{status:400});
    }
}