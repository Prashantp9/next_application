import "dotenv/config";

import Express from "express";
import connectDB from "./connection/mongoCon.js";
import userRouter from "./Router/userRoute.js";

const app = Express();
const PORT = process.env.PORT || 5000;
// Database connection
connectDB();
//app Routes
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`application running on PORT ${PORT}`);
});
