import connectToMongoDB from "@/lib/mongodb";
import BankD from "@/models/bankModel";
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
            const isbank = await BankD.findOne({ 'userId': userid.toString()},["-userId","-_id","-createdAt"]);
            if(isbank != null){
                result = {data:isbank,success:true};
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
    result = {error:"server problem Try Again!",success:false};
return NextResponse.json(result,{status:403});
}

}


// POST Request
export async function POST(req) {
    let result;
    try{
    const isUser = await dataFromToken(req);
        if(isUser.success){
            const {holderName, bankName, accountNumber,ifscCode} = await req.json();
            const userid = (isUser.userId).toString();
            const data = {
                holder_name:holderName.toString(),
                bank_name:bankName.toString(),
                account_number: accountNumber,
                ifsc_code: ifscCode.toString(),
                   userId: userid,
            }
            await connectToMongoDB(); 
            const isbank = await BankD.findOne({ 'userId': userid.toString()},"_id");
        
            if(isbank != null){
                const newd = await BankD.findOneAndUpdate({ 'userId': userid},data,{new: true})
                result = {message:"Updated successfully",success:true};
                return NextResponse.json(result,{status:201});
            }else{
                await BankD.create(data);
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