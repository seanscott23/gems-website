import express from "express";
import { Router } from "express";
import { ClipPropsModel, UserPropsModel } from "../../typescript/models";
import User from "../../models/User";
import Clip from "../../models/Clip";
import multer from "multer";
var admin = require("firebase-admin");
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

router.post("/login", (req, res) => {
  // const { errors, isValid } = validateLoginInput(req.body);
  // if (!isValid) return res.status(400).json(errors);
  const idToken = req.body.idToken.toString();
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then((sessionCookie) => {
      const options = { maxAge: expiresIn, httpOnly: true };
      res.cookie("session", sessionCookie, options);
      res.end(JSON.stringify({ status: "success" }));
    })
    .catch((error) => {
      return res.status(401).send("Unauthorized Request");
    });
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

router.get("/logout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

router.get("/library", (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then(() => {
      res.render("library.tsx");
    })
    .catch((error) => {
      res.redirect("login");
    });
});

export default router;
