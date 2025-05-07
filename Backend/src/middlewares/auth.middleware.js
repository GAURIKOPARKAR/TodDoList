import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";


export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });

    }

    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id)
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });

    }
    req.user = user;
    next();
  }
   catch (error) {
    return res.status(401).json({ message: "Unauthorized" });

  }
};