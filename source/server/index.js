import "dotenv/config";

import Express from "express";
import User from "./Models/usersModel.js";
import connectDB from "./connection/mongoCon.js";

const app = Express();
const PORT = process.env.PORT || 5000;
// Database connection

connectDB();

app.listen(PORT, () => {
  console.log(`application running on PORT ${PORT}`);
});
