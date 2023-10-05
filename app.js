const express = require('express')
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();


app.use("/api", require("./routes/blogRoutes"));

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
