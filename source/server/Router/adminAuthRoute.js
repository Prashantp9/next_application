import { Router } from "express";

const adminAuth = Router();

adminAuth.post("/test", (req, res) => {
  res.send("admin has been authenticated");
});

export { adminAuth };
