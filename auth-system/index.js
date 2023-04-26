const app = require("./app");

const { PORT } = process.env;

app.listen(process.env.PORT, () => {
  console.log(`Example app listening`, PORT);
});
