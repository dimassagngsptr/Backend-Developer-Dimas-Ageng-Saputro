const express = require("express");
const db = require("./models");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

app.use("/v1", routes);

app.listen(PORT, () => {
  db.sequelize.sync({ force: true });
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
