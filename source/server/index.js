import "dotenv/config";

import connectDB from "./connection/mongoCon.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import publicRoute from "./Router/publicRoute.js";
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
app.use("/public", publicRoute);
app.get("test", (req, res) => res.send("server running"));

app.listen(PORT, () => {
  console.log(`application running on PORT ${PORT}`);
});
