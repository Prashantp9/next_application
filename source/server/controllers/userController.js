import jwt from "jsonwebtoken";
import { responseType } from "../constants/allConstants.js";
import userService from "../service/userService.js";

const UserController = {
  createUserController: async (req, res) => {
    try {
      const createUser = await userService.createUserService(req.body);

      if (createUser) {
        // Generating jwtToken
        const tokenParams = {
          id: createUser?._id,
          name: req.body.name,
          email: req.body.email,
        };
        const jwtToken = await jwt.sign(
          { tokenParams },
          process.env.TOKEN_SECRET_KEY
        );
        return res.status(200).json({
          type: responseType.SUCCESS,
          message: "successfully created user",
          data: { data: createUser, token: jwtToken },
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
      if (error.code == 11000) {
        return res.status(400).json({
          message: "data already exits in the database",
        });
      }
      res.status(500).json({
        error: error,
      });
    }
  },
  userLoginController: async (req, res) => {},
  deleteUserController: async (req, res) => {},
  updateUserController: async (req, res) => {},
  findUserController: async (req, res) => {},
};

export default UserController;
