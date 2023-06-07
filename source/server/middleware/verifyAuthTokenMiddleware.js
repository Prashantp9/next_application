import User_Model from "../Models/userModel.js";
import jwt from "jsonwebtoken";

export const verifyAuthTokenMiddleware = async (req, res, next) => {
  try {
    if (req.headers?.["auth_token"]) {
      const token = req.headers?.["auth_token"];
      const tokenData = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      const userId = tokenData?.tokenParams.id;
      const user = await User_Model.findById(userId);
      if (user) {
        next();
      }
    } else {
      res.status(400).send("cookie not found");
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const verifyByCookie = async (req, res, next) => {
  console.log("cookie", req?.cookies);
  try {
    if (req?.cookies?.token) {
      const token = req.cookies.token;
      const verification = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      const userId = verification?.tokenParams?.id;
      const user = await User_Model.findById(userId);
      if (user) {
        next();
      }
    } else {
      res.status(400).send("cookie not found");
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
