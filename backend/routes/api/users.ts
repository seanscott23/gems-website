import express from "express";
import { Router } from "express";
import { ClipPropsModel, UserPropsModel } from "../../typescript/models";
import User from "../../models/User";
import Clip from "../../models/Clip";
import multer from "multer";
const router = express.Router();
const upload = multer();

router.get("/:userId/clips", async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    const clips = await Clip.find({ ownerId: req.params.userId });
    return res.json(clips);
  }
  return res.status(403).send("Not authorized");
});

router.post("/signup", (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    const user = new User(req.body);
    const savedUser = user.save();
    return res.status(201).json(savedUser);
  }
  return res.status(403).send("Not authorized");
});

export default router;
