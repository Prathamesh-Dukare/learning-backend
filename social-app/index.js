const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/insta/:name/:id", (req, res) => {
  console.log(req.params);
  res.status(201).json({
    data: [],
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
