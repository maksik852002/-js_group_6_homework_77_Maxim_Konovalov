const path = require("path");

const express = require("express");
const multer = require("multer");
const nanoid = require("nanoid");

const fileDb = require("../fileDb");
const config = require("../config");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", async (req, res) => {
  const messages = await fileDb.getMessages();
  const date = new Date(req.query.datetime);
  if (req.query.datetime) {
    if (isNaN(date.getDate())) {
      res.status(400).send({ error: "Bad date" });
    } else {
      const data = messages.filter(
        message => message.datetime > req.query.datetime
      );
      res.send(data);
    }
  } else {
    res.send(messages.slice(-30));
  }
});

router.get("/:id", async (req, res) => {
  const item = await fileDb.getItemById(req.params.id);
  res.send(item);
});

router.post("/", upload.single("image"), async (req, res) => {
  const message = req.body;
  if (req.body.message.length === 0) {
    res.status(400).send({ error: "Message must be present in the request!" });
  } else {
    req.file && (message.image = req.file.filename);
    message.author.length === 0 && (message.author = "Anonymous");
    await fileDb.addMessage(message);
    res.send(message.id);
  }
});

module.exports = router;
