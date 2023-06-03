import userService from "../service/userService.js";

const UserController = {
  createUserController: async (req, res) => {
    const data = await userService(req.body);
  },
  deleteUserController: (req, res) => {},
  updateUserController: (req, res) => {},
  findUserController: (req, res) => {},
};

export default UserController;
