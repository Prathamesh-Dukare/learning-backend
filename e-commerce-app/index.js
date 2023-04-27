const app = require("./app");
require("dotenv").config();
const connectWithDB = require("./config/db");

const port = process.env.PORT || 3000;

connectWithDB();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

