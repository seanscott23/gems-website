import express from "express";
import { Router } from "express";
import { ClipPropsModel, UserPropsModel } from "../../typescript/models";
import User from "../../models/User";
import Clip from "../../models/Clip";
import multer from "multer";
const router = express.Router();
const upload = multer();

router.get(
  "/:userId/clips",
  upload.single("file"),
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Clip.find({ ownerId: req.params.userId })
      .then((clips: ClipPropsModel[]) => res.json(clips))
      .catch((err: {}) => res.status(400).json(err));
  }
);

export default router;
