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
          id: req.body._id,
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
      console.log(error);
      res.status(500).json({
        error: error,
      });
    }
  },
  deleteUserController: (req, res) => {},
  updateUserController: (req, res) => {},
  findUserController: (req, res) => {},
};

export default UserController;
