import User_Model from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import { responseType } from "../constants/allConstants.js";

export const verifyAuthTokenMiddleware = async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.body.auth_token) {
      const token = req.body?.auth_token;
      const tokenData = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      console.log(tokenData);
      // const userId = tokenData?.tokenParams.id || tokenData?.id;
      const userId = tokenData?.id;
      const user = await User_Model.findById(userId);
      if (user) {
        res
          .cookie("token", req.body?.auth_token)
          .status(200)
          .send("cookie has been set");
        next();
      }
    } else {
      res.status(400).send("wrong auth token");
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const verifyByCookie = async (req, res, next) => {
  try {
    if (req?.cookies?.token) {
      const token = req.cookies.token;
      const verification = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      const userId = verification?.id;
      const user = await User_Model.findById(userId);
      if (user) {
        req.body["_id"] = userId;
        next();
      }
      if (!user) {
        res.status(400).json({
          type: responseType.FAILURE,
          message: "user not found ",
          error: [],
        });
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
