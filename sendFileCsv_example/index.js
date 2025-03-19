const express = require("express");
const fs = require("fs");
const multer = require("multer");
const csv = require("csv-parser");

const app = express();
const port = 3000;
const upload = multer({ dest: "csv/" });

app.post("/file", upload.single("file"), (req, res) => {
  console.log(req.file);
  if (!req.file) {
    res.send("arquivo não informado");
  }

  const results = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv({ separator: ";" }))
    .on("data", (data) => results.push(data))
    .on("end", () => {
      fs.unlinkSync(filePath);
      console.log(results);
      res.json(results);
    })
    .on("error", () => {
      res.status(500).json({ message: "problema no servidor" });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
