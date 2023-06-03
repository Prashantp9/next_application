import "dotenv/config";

import connectDB from "./connection/mongoCon.js";
import express from "express";
import userRouter from "./Router/userRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
// Database connection
connectDB();
//app Routes
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`application running on PORT ${PORT}`);
});
