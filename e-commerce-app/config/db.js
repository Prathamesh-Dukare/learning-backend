const monsoose = require("mongoose");

const connectWithDB = async () => {
  monsoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
};

module.exports = connectWithDB;
