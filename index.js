const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnetion = require("./dbConnection");
const projectRoutes = require("./routes/projectRoute");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Ok from server");
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(projectRoutes);
app.use(adminRoutes);
dbConnetion();
