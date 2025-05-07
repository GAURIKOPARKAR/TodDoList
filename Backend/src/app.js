import express from "express"
import cors from "cors"


const app = express();
app.use(express.json({limit:"16kb"}))
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))





import userRouter from "./routes/user.routes.js"
app.use("/user", userRouter)

import taskRouter from "./routes/task.routes.js"
app.use("/task", taskRouter)




export default app;
