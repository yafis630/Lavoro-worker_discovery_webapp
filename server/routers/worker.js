import "dotenv/config";

import fs from "fs";

import express from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import multer from "multer";

import authenticateToken from "../middleware/authenticateToken.js";
import generateAccessToken from "../helpers/generateAccessToken.js";

import Worker from "../models/worker.js";
import Token from "../models/token.js";

const router = new express.Router();

router.post("/workers/login", async (req, res) => {
  const login = req.body.login;
  const pword = req.body.password;
  Worker.findOne({ email: login }, async (err, worker) => {
    if (err) {
      console.log(error);
    } else if (worker) {
      bcrypt.compare(pword, worker.password, async (err, result) => {
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

router.post("/workers", async (req, res) => {
  const exists = await Worker.findOne({ email: req.body.email });
  if (exists) res.send(false);
  else {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const worker = {
      fullName: req.body.fullName,
      gender: req.body.gender,
      birthDate: req.body.birthDate,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      profession: req.body.profession,
      bio: req.body.bio,
      password: password,
      available: true,
    };
    const newWorker = new Worker(worker);
    await newWorker.save();
    res.send(true);
  }
});

router.get("/workers/home", authenticateToken, (req, res) => {
  const worker = Worker.findOne({ email: req.login.login }, (err, worker) => {
    if (err) {
      console.log(error);
    } else {
      res.send({
        fullName: worker.fullName,
        available: worker.available,
      });
    }
  });
});

router.get("/workers/:category", authenticateToken, (req, res) => {
  const category = req.params.category;

  const workers = Worker.find(
    { profession: category, available: true },
    (err, workers) => {
      if (err) {
        console.log(error);
      } else {
        const data = workers.map((worker) => ({
          fullName: worker.fullName,
          email: worker.email,
          phoneNumber: worker.phoneNumber,
          bio: worker.bio,
        }));

        res.send(data);
      }
    }
  );
});

router.put("/workers/availability", authenticateToken, async (req, res) => {
  const available = req.body.checked;
  const filter = { email: req.login.login };
  const update = { available: available };
  const changed = await Worker.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.send(true);
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.put(
  "/workers/avatar",
  authenticateToken,
  upload.single("avatar"),
  async (req, res) => {
    const email = req.login.login;
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 170, height: 170 })
      .png()
      .toBuffer();
    fs.writeFileSync(`./db/images/${email}.png`, buffer);
    res.send({ success: true });
  }
);

router.get("/workers/avatar/:avatarId", async (req, res) => {
  const email = req.params.avatarId;
  const path = process.env.IMG_URL + email + ".png";
  res.set("Content-Type", "image/png");

  if (fs.existsSync(path)) {
    res.sendFile(path);
  } else {
    res.sendFile(process.env.DEFAULT_IMG_URL);
  }
});

router.put("/workers/password", authenticateToken, async (req, res) => {
  const worker = await Worker.findOne({ email: req.login.login });
  bcrypt.compare(req.body.password, worker.password, async (err, result) => {
    if (err) {
      console.log(err);
    } else if (result) {
      const filter = { email: req.login.login };
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.newPassword, salt);
      const update = { password: password };
      const changed = await Worker.findOneAndUpdate(filter, update, {
        new: true,
      });

      res.send(true);
    }
  });
});

router.put("/workers/bio", authenticateToken, async (req, res) => {
  const filter = { email: req.login.login };
  const update = { bio: req.body.bio };
  const changed = await Worker.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.send(true);
});

export default router;
