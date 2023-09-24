import connectToMongoDB from "@/lib/mongodb";
import EarnLevels from "@/models/earnLevelM";
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
            const isData = await EarnLevels.findOne({ 'userId': userid.toString()},["-userId","-createdAt","-_id"]);
            if(isData !== null){
                result = {data:isData,success:true};
                return NextResponse.json(result,{status:200});
            }else{
                result = {data:isUser.error,success:false};
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
