import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { createTodo,
  updateTodo,
  readAllTodo,
  deleteTodo,} from  "../controllers/task.controller.js";


  const router = Router();
  
  router.route("/createtodo").post(verifyJWT,createTodo);
  router.route("/updatetodo").put(verifyJWT, updateTodo);
  router.route("/readalltodo").get(verifyJWT, readAllTodo);
  router.route("/deletetodo/:id").delete(verifyJWT, deleteTodo);
  
    
  
  export default router;
  