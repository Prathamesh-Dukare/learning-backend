const promiseHOC = require("../middleware/promiseHOF");

exports.home = promiseHOC(async (req, res) => {
  // const a = await 1;
  res.send("Hello World3!");
});
