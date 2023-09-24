import connectToMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { verifyAuth } from '@/auth/verifyToken';

const dataFromToken = async(request)=>{
    const token = request.cookies.get("authToken")?.value || '';
    const data = await verifyAuth(token);
    return data;
}


// GET request
export async function GET(req) {
    let result;
    try{
    const isUser = await dataFromToken(req);
    if(isUser.success){
        const userid = isUser.userId;
            await connectToMongoDB();
            const userExist = await User.findOne({ '_id': userid.toString()},["refer_code","isPlan_buy","-_id"]);
            if(userExist != null){
                if(userExist.isPlan_buy === true){
                    result = {data:userExist,success:true};
                    return NextResponse.json(result,{status:200});
                }else{
                    result = {data:"Plan buy",success:false};
                    return NextResponse.json(result,{status:200});
                }
            }else{
                result = {data:"No Data",success:false};
                return NextResponse.json(result,{status:200});
            }
    }else{
        result = {error:"Token Not vailed",success:false};
        return NextResponse.json(result,{status:200});
    }  
}catch(err){
    result = {error:"server problem Try Again!",success:false};
return NextResponse.json(result,{status:403});
}
 
}