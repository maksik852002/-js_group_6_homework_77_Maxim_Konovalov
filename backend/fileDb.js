const fs = require("fs");
const nanoid = require("nanoid");

const filename = "./messages/db.json";
let data = [];

const readFile = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFile = (filename, message) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, message, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  async init() {
    try {
      const messages = await readFile(filename);
      data = JSON.parse(messages.toString());
    } catch (e) {
      console.log("Could not read file" + filename);
      data = [];
    }
  },
  async getMessages() {
    return data;
  },
  async getItemById(id) {
    return data.find(item => item.id === id);
  },
  async addMessage(message) {
    message.id = nanoid();
    message.datetime = new Date();
    data.push(message);
    await this.save();
  },
  async save() {
    const message = JSON.stringify(data, null, 2);
    await writeFile(filename, message);
  }
};
