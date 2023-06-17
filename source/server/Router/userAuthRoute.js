import { Router } from "express";

const authUser = Router();

authUser.post("/test", (req, res) => {
  res.send("user is Authenticated");
});

export { authUser };
