import connectToMongoDB from "@/lib/mongodb";
import PayRequest from '@/models/withdrawM';
import UpiId from "@/models/upiModel";
import BankD from "@/models/bankModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { verifyAuth } from '@/auth/verifyToken';
import EarnLevels from "@/models/earnLevelM";

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
            const isrequest = await PayRequest.find({ 'userId': userid.toString()},["-payment_modeId","-createdAt","-_id"]);
            if(isrequest.length !== 0){
                result = {data:isrequest.reverse(),success:true};
                return NextResponse.json(result,{status:200});
            }else{
                result = {data:"No Request Yet",success:false};
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
            const {paymentMode, payment} = await req.json();
            const userid = (isUser.userId).toString();
            await connectToMongoDB(); 
            const isPlanBuy = await User.findOne({'_id':userid.toString()},"isPlan_buy");
            if(!isPlanBuy.isPlan_buy){
                result = {message:"Buy a Plan",success:false};
                return NextResponse.json(result,{status:200});
            }
            let paymentModeID;
            if(paymentMode === 'UPI'){
                 paymentModeID = await UpiId.findOne({'userId':userid.toString()},"_id");
                 if(!paymentModeID){return NextResponse.json({message:"Add UPI Details",success:false},{status:200});}
            }else{
                 paymentModeID = await BankD.findOne({'userId':userid.toString()},"_id");
                 if(!paymentModeID){return NextResponse.json({message:"Add Bank Details",success:false},{status:200});}
            }
            const isPayment = await EarnLevels.findOne({'userId':userid.toString()},["current_amount","total_withdraw","-_id"]);
            console.log(isPayment);
            if(isPayment.current_amount < payment){
                return NextResponse.json({message:`Your Current Amount is less then ${payment}` ,success:false},{status:200});
            }
            const data = {
                requested_payment:payment.toString(),
                payment_modeId: paymentModeID._id,
                payment_status: "Pending",
                payment_mode: paymentMode,
                   userId: userid,
            }
            const isrequest = await PayRequest.find({ 'userId': userid.toString(),payment_status: 'Pending'},"payment_status");
            if(isrequest.length !== 0){
                if(isrequest[0].payment_status === "Pending"){
                result = {message:"Your a request is in Pending",success:false};
                return NextResponse.json(result,{status:200});
                }
            }else{
                await EarnLevels.findOneAndUpdate({"userId":userid.toString()},{$inc : {total_withdraw:payment,current_amount: -(payment)}});
                await PayRequest.create(data);
                result = {success:true,message: "Your Request Submited Successfully"};
                return NextResponse.json(result,{status:201});
            }
        }else{
            result = {message:"You are not Login",success:false};
            return NextResponse.json(result,{status:400});
        }
    
    }catch(err){
        result = {message:"Server problem Try Again!",success:false};
        console.log(err.message);
        return NextResponse.json(result,{status:400});
    }
}
