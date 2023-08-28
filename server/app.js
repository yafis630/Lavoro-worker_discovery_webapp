import "dotenv/config";

import express from "express";

import "./db/mongoose.js";

import userRouter from "./routers/user.js";
import workerRouter from "./routers/worker.js";

import Token from "./models/token.js";

import authenticateToken from "./middleware/authenticateToken.js";

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(workerRouter);

const PORT = process.env.PORT || 3001;

app.delete("/logout", authenticateToken, async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const del = await Token.deleteOne({ token });
  if (del) res.send(true);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
