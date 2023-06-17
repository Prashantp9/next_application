import User_Model from "../Models/userModel.js";
import bcrypt from "bcryptjs";

const userService = {
  createUserService: async (data) => {
    // generating a hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    if (!hashedPassword) {
      return false;
    }
    const user = await User_Model.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      isAdmin: data.isAdmin,
    });

    return user;
  },
};

export default userService;
