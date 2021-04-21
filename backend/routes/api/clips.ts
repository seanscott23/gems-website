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

router.post("/", (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    // const { isValid, errors } = validateBookingInput(req.body);
    // if (!isValid) return res.status(400).json(errors);

    const newClip: ClipPropsModel = new Clip({
      // ownerId: req.body.ownerId,
      // clipId: req.body.clipId,
      // title: req.body.title,
      // description: req.body.decription,
      url: req.body.url,
    });

    newClip
      .save()
      .then((clip) => res.json(clip))
      .catch((err) => res.json(err));
  }
  return res.status(403).send("Not authorized");
});

router.delete("/:clipId", (req, res) => {
  const id = req.params.clipId;
  Clip.remove({ _id: id })
    .then((result) => res.status(200).json(result))
    .catch((error: any) => res.status(400).json({ error: error }));
});

router.patch("/:clipId", (req, res) => {
  const id = req.params.clipId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Clip.updateOne({ _id: id }, { $set: updateOps })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error: any) => {
      console.log(error);
      res.status(400).json({ error: error });
    });
});
export default router;
