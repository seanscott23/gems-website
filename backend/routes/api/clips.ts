import express from "express";
import { Router } from "express";
import { ClipPropsModel, UserPropsModel } from "../../typescript/models";
import User from "../../models/User";
import Clip from "../../models/Clip";
import multer from "multer";
const router = express.Router();
const upload = multer();

router.get("/", (req, res) => {
  Clip.find()
    .then((clips) => res.json(clips))
    .catch((err: any) => res.status(402).json(err));
});

export default router;
