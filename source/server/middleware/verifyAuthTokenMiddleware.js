import jwt from "jsonwebtoken";

export const verifyAuthTokenMiddleware = async (req, res, next) => {
  console.log(req.headers);
  if (req.headers?.["auth_token"]) {
    const token = req.headers?.["auth_token"];
    const tokenData = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    console.log("prams", tokenData.tokenParams);
    const jwtToken = await jwt.sign(
      tokenData.tokenParams,
      process.env.TOKEN_SECRET_KEY
    );
    if (token == jwtToken) {
      res.send("user has been authenticated successfully");
    }
    if (!(token == jwtToken)) {
      console.log(token);
      return res.status(400).send("use authentication failed");
    }
    next();
  } else {
    res.status(400).json({
      message: "Token not found",
    });
  }
};
