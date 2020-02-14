const express = require("express");
const messages = require("./app/messages");
const cors = require("cors");
const fileDb = require("./fileDb");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/messages", messages);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
};

run().catch(e => {
  console.log(e);
});
