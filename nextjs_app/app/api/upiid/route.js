import connectToMongoDB from "@/lib/mongodb";
import UpiId from "@/models/upiModel";
import { NextResponse } from "next/server";
import { verifyAuth } from '@/auth/verifyToken';

const dataFromToken = async(token)=>{
    const data = await verifyAuth(token);
    return data;
}


// GET request
export async function GET(req) {
    let result;
    try{
         const token = await req.cookies.get("authToken")?.value || '';
    const isUser = await dataFromToken(token);
    if(isUser.success){
        const userid = isUser.userId;
            await connectToMongoDB();
            const isupi = await UpiId.findOne({ 'userId': userid.toString()},["-userId","-_id","-createdAt"]);
            if(isupi != null){
                result = {data:isupi,success:true};
                return NextResponse.json(result,{status:200});
            }else{
                result = {data:"No Data",success:false};
                return NextResponse.json(result,{status:200});
            }
    }else{
        result = {error:"Token Not vailed",success:false};
        return NextResponse.json(result,{status:200});
    }  
}catch(err){
        console.log(err.message)
;    result = {error:"server problem Try Again!",success:false};
return NextResponse.json(result,{status:403});
}

}


// POST Request
export async function POST(req) {
    let result;
    try{
         const token = await req.cookies.get("authToken")?.value || '';
    const isUser = await dataFromToken(token);
        if(isUser.success){
            const {name, phone, upiid} = await req.json();
            const userid = (isUser.userId).toString();
            const data = {
                name:name.toString(),
                 phone:phone.toString(),
                  upi: upiid.toString(),
                   userId: userid,
            }
            await connectToMongoDB(); 
            const isupi = await UpiId.findOne({ 'userId': userid.toString()},"_id");
        
            if(isupi != null){
                const newd = await UpiId.findOneAndUpdate({ 'userId': userid},data,{new: true})
                result = {message:"Updated successfully",success:true};
                return NextResponse.json(result,{status:201});
            }else{
                await UpiId.create(data);
                result = {success:true,message: "Submited Successfully"};
                return NextResponse.json(result,{status:201});
            }
        }else{
            result = {error:"You are not Login",success:false};
            return NextResponse.json(result,{status:400});
        }
    
    }catch(err){
        result = {error:"Server problem Try Again!",success:false};
        console.log(err.message);
        return NextResponse.json(result,{status:400});
    }
}
