import express from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authenticateToken from "../middleware/authenticateToken.js";
import generateAccessToken from "../helpers/generateAccessToken.js";

import User from "../models/user.js";
import Token from "../models/token.js";

const router = new express.Router();

router.post("/users/login", async (req, res) => {
  const login = req.body.login;
  const pword = req.body.password;
  User.findOne({ email: login }, async (err, user) => {
    if (err) {
      console.log(error);
    } else if (user) {
      bcrypt.compare(pword, user.password, async (err, result) => {
        if (err) {
          console.log(err);
        } else if (result) {
          const accessToken = generateAccessToken(login);
          const token = new Token({
            token: accessToken,
          });
          await token.save();
          res.send({ accessToken });
        } else res.send(null);
      });
    } else {
      res.send(null);
    }
  });
});

router.post("/users", async (req, res) => {
  const exists = await User.findOne({ email: req.body.email });
  if (exists) res.send(false);
  else {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const user = {
      fullName: req.body.fullName,
      gender: req.body.gender,
      birthDate: req.body.birthDate,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: password,
    };
    const newUser = new User(user);
    await newUser.save();
    res.send(true);
  }
});

router.get("/users/home", authenticateToken, (req, res) => {
  const user = User.findOne({ email: req.login.login }, (err, user) => {
    if (err) {
      console.log(error);
    } else {
      res.send({
        fullName: user.fullName,
      });
    }
  });
});

router.put("/users/password", authenticateToken, async (req, res) => {
  const user = await User.findOne({ email: req.login.login });
  bcrypt.compare(req.body.password, user.password, async (err, result) => {
    if (err) {
      console.log(err);
    } else if (result) {
      const filter = { email: req.login.login };
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.newPassword, salt);
      const update = { password: password };
      const changed = await User.findOneAndUpdate(filter, update, {
        new: true,
      });

      res.send(true);
    }
  });
});

export default router;
