import {
  enviromentVar,
  responseType,
  token,
} from "../constants/allConstants.js";

import User_Model from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userService from "../service/userService.js";

const UserController = {
  createUserController: async (req, res) => {
    try {
      let createUser = await userService.createUserService(req.body);

      if (createUser) {
        // Generating jwtToken
        const tokenParams = {
          id: createUser?._id,
          name: req.body.name,
          email: req.body.email,
        };
        const jwtToken = await jwt.sign(
          tokenParams,
          process.env.TOKEN_SECRET_KEY
        );

        createUser = JSON.parse(JSON.stringify(createUser));
        return res
          .cookie(token.USER_TOKEN, jwtToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            secure: false,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            overwrite: true,
          })
          .status(200)
          .json({
            type: responseType.SUCCESS,
            message: "successfully created user",
            data:
              process.env.ENVIROMENT == enviromentVar.PROD
                ? {}
                : { ...createUser, jwtToken },
          });
      }
      if (!createUser) {
        return res.status(400).json({
          type: responseType.FAILURE,
          message: "failed to create user",
          error: [],
        });
      }
    } catch (error) {
      console.log(error);
      if (error.code == 11000) {
        return res.status(400).json({
          type: responseType.FAILURE,
          message: "user already exist",
          error: [],
        });
      }
      res.status(500).json({
        error: error,
      });
    }
  },
  login: async (req, res, next) => {
    try {
      const getUserByPhone = await User_Model.findOne({
        phone: req.body.phone,
      });
      if (!getUserByPhone) {
        return res.status(400).json({
          type: responseType.FAILURE,
          message: "User not found",
          error: [],
        });
      }
      const password = await bcrypt.compare(
        req.body.password,
        getUserByPhone?.password
      );
      if (password) {
        const tokenParams = {
          id: getUserByPhone?._id,
          name: getUserByPhone?.name,
          email: getUserByPhone?.email,
        };
        const jwtToken = await jwt.sign(
          tokenParams,
          process.env.TOKEN_SECRET_KEY
        );
        return res.cookie(token.USER_TOKEN, jwtToken).status(200).json({
          type: responseType.SUCCESS,
          message: "logged in",
        });
      }
      if (!password) {
        res.status(400).json({
          type: responseType.FAILURE,
          message: "invalid credentials",
          error: [],
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error,
      });
    }
  },
  adminLogin: async (req, res, next) => {
    try {
      const getUserByPhone = await User_Model.findOne({
        phone: req.body.phone,
      });
      if (!getUserByPhone) {
        return res.status(400).json({
          type: responseType.FAILURE,
          message: "Admin not found",
          error: [],
        });
      }
      if (!getUserByPhone?.isAdmin) {
        res.status(400).json({
          type: responseType.FAILURE,
          message: "Not an Admin",
          error: [],
        });
      }
      if (getUserByPhone?.isAdmin) {
        const password = await bcrypt.compare(
          req.body.password,
          getUserByPhone?.password
        );
        if (password) {
          const tokenParams = {
            id: getUserByPhone?._id,
            name: getUserByPhone?.name,
            email: getUserByPhone?.email,
          };
          const jwtToken = await jwt.sign(
            tokenParams,
            process.env.TOKEN_SECRET_KEY
          );
          return res.cookie(token.ADMIN_TOKEN, jwtToken).status(200).json({
            type: responseType.SUCCESS,
            message: "Admin logged in",
          });
        }
        if (!password) {
          res.status(400).json({
            type: responseType.FAILURE,
            message: "invalid credentials",
            error: [],
          });
        }
      }
    } catch (error) {}
  },
  logout: async (req, res, next) => {
    try {
      return res.clearCookie(token.USER_TOKEN).status(200).json({
        type: responseType.SUCCESS,
        message: "Logout Successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  deleteUserController: async (req, res) => {},
  updateUserController: async (req, res) => {},
  findUserController: async (req, res) => {},
};

export default UserController;
