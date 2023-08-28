import "dotenv/config";

import jwt from "jsonwebtoken";

import Token from "../models/token.js";

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const existing = await Token.findOne({ token: token });

  if (token === null) {
    return res.sendStatus(401);
  }
  if (!existing) {
    return res.sendStatus(403);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, login) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.login = login;
    next();
  });
}

export default authenticateToken;
