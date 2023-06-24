import "dotenv/config";

import connectDB from "./connection/mongoCon.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import userRouter from "./Router/userRoute.js";

const app = express();
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
// Database connection
connectDB();
//app Routes
app.use("/user", userRouter);
app.post("/test", (req, res) => {
  res
    .cookie("token", "1234", {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      domain: "localhost",
    })
    .status(200)
    .send("api works");
});

app.listen(PORT, () => {
  console.log(`application running on PORT ${PORT}`);
});
