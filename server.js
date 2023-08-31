const app = require("./src/config/express");
const Database = require("./src/config/database");
require("dotenv").config();

// connect database
Database();

// listen to req
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
