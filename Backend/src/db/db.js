import mongoose from "mongoose"

const connectDatabase = async()=>{
   try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
    console.log("Connected to Database")
   
   } catch (error) {
     console.log(error);
     process.exit()
   }
}
export default connectDatabase