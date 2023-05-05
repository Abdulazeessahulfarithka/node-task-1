const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const dirpath = path.resolve(path.join(__dirname, "timestamp"));
console.log("dirpath", dirpath);
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}

// app.use(express.static("timestamps"));

app.get("/static", (req, res) => {
  let time = new Date();
  let datestring = time.toUTCString();
  let content = `last update timestamp is ${datestring}`;
  // const filename = `${datestring}.txt`;
  const filename = "date-time.txt";
  console.log(filename);
  const link = path.resolve(path.join(dirpath, filename));
  fs.writeFileSync(link, content, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("file create success");
    }
  });
  res.send(`current timestamp----${datestring}`);
});

app.listen(5000);
