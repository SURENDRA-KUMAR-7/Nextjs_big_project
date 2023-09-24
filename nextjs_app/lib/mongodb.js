import mongoose from "mongoose";

const connectToMongoDB = async()=>{
    try{
        // console.log(mongoose.connection.readyState);
        if(mongoose.connection.readyState === 1){ 
            return;
        }
        const url = process.env.MONGO_DB_URL;
    const connetion = await mongoose.connect(url);
    } catch(err) {
        console.log(err.message);
    } 
}
mongoose.connection.on('error', err => {
    console.log(err);
  });

export default connectToMongoDB;