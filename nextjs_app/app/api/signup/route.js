import connectToMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Encrypt
const encripass = (data)=>{
    let encripted = bcrypt.hashSync(data,parseInt(process.env.BCRIPT_KEY));
    return encripted;
}

// referall code genretor
function generateRandomCode(length=6) {
    const charset = "ABCDEFGHIJKL0123456789MNOP1937QRSTUVWXYZ0123456789";
    let code = "";
    const charsetLength = charset.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      code += charset.charAt(randomIndex);
    }
    return code;
  }

// POST Request
export async function POST(req) {
    let result;
    try{
    const {name, phone, password, referCode} = await req.json();
    await connectToMongoDB();
    let user = await User.findOne({ 'phone': phone.toString()},["phone","-_id"]);
    if(user != null){
        result = {error:"Account already exists",success:false};
        return NextResponse.json(result,{status:200});
    }else{
        if(referCode){
            const isReferCodeRight = await User.findOne({ 'refer_code': referCode.toString()},"refer_code");
            if(!isReferCodeRight){return NextResponse.json({error:"Invalid Refer Code!",success:false},{status:200});}
        }
        let genretedReferCode = async()=>{
            let code =  generateRandomCode();
            let refercode = await User.findOne({ 'refer_code': code.toString()},"refer_code");
            if(refercode){
                genretedReferCode();
            }else{
                return code.toString();
            }
            }
            const u_id = async()=>{
                const phoneLastN = (phone.toString()).slice(6);
                const rendom = Math.floor(Math.random() * 1000);
                const uid = phoneLastN.concat(rendom.toString());
                return uid;
            }
        const GenReferalCode = await genretedReferCode();
        const GenretedUid = await u_id();
         let encriptPass = encripass(password);
        await User.create({name:name.toString() , phone:phone.toString(), password: encriptPass,refer_code: GenReferalCode,signpBy_refer: referCode,U_ID: GenretedUid});
        result = {success:"Submited successfuly"};
        return NextResponse.json(result,{status:201});
    }
    
    }catch(err){
        result = {error:"Something went wrong",err,success:false};
        console.log(err.message);
        return NextResponse.json(result,{status:400});
    }
}






  