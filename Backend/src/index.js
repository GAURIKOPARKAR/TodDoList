import dotenv from "dotenv"
dotenv.config({path:'./.env'})
import connectDatabase from "./db/db.js";
import app from "./app.js";

connectDatabase().
then(()=>{
    app.listen(process.env.PORT|| 8000, ()=>{
        console.log("listening")
    })
   
}).
catch((error)=>{
    console.log("Could not connect to mongodb",error)
})