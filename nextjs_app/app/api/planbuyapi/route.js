import connectToMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import EarnLevels from "@/models/earnLevelM";
import { NextResponse } from "next/server";
import { verifyAuth } from '@/auth/verifyToken';

const dataFromToken = async(token)=>{
    const data = await verifyAuth(token);
    return data;
}

export async function POST(req){
    let result;
    try{
        const token = await req.cookies.get("authToken")?.value || '';
        const {amount} = await req.json();
        const isUser = await dataFromToken(token);
        if(isUser.success){
            const userid = isUser.userId;
                await connectToMongoDB();
                const userExist = await User.findOne({ '_id': userid.toString()},["-name","-phone","-password"]);
               
                if(userExist != null){
                    if(userExist.isPlan_buy === true){
                        result = {message:"Plan buy Already!",success:false};
                        return NextResponse.json(result,{status:200});
                    }else{
                        const isearnlevelCreated = await EarnLevels.findOne({userId:userid.toString()},"userId");
                        if(isearnlevelCreated == null){
                            await EarnLevels.create({userId:userid.toString()});
                        }
                         await User.findOneAndUpdate({ '_id': userid.toString()},{isPlan_buy: true});
                        if(userExist.signpBy_refer){
                            //  Refer Level 1
                            const signBy1 = userExist.signpBy_refer;
                            const signBy_user1 = await User.findOne({refer_code:signBy1},["_id","signpBy_refer"]);
                            await EarnLevels.findOneAndUpdate({"userId":signBy_user1},{$inc : {total_earning:250,today_earning:250,current_amount:250},$push : {level_1: userExist.U_ID}});
                            //  Refer Level 2
                            if(signBy_user1.signpBy_refer){
                                const signBy2 = signBy_user1.signpBy_refer;
                            const signBy_user2 = await User.findOne({refer_code:signBy2},["_id","signpBy_refer"]);
                            await EarnLevels.findOneAndUpdate({"userId":signBy_user2},{$inc : {total_earning:150,today_earning:150,current_amount:150},$push : {level_2: userExist.U_ID}});
                            //  Refer Level 3
                            if(signBy_user2.signpBy_refer){
                                const signBy3 = signBy_user2.signpBy_refer;
                            const signBy_user3 = await User.findOne({refer_code:signBy3},["_id","signpBy_refer"]);
                            await EarnLevels.findOneAndUpdate({"userId":signBy_user3},{$inc : {total_earning:100,today_earning:100,current_amount:100},$push : {level_3: userExist.U_ID}});
                            }
                        }
                        result = {message:"by refer Plan Buy Successfully!",success:true};
                            return NextResponse.json(result,{status:200});
                        }else{
                            result = {message:"Plan Buy Successfully!",success:true};
                            return NextResponse.json(result,{status:200});
                        }
                       
                    }
                }else{
                    result = {messsage:"SignUp now",success:false};
                    return NextResponse.json(result,{status:200});
                }
        }else{
            result = {message:"Token Not vailed",success:false};
            return NextResponse.json(result,{status:200});
        }  
    }catch(err){
        result = {message:"server problem Try Again!",success:false};
        return NextResponse.json(result,{status:403});
    }
}
