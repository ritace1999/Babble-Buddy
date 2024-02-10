import express from "express";
import { config } from "dotenv";
import { serverError } from "./middleware/error.middleware.js";

const app = express();
config();
const PORT = process.env.PORT || 4000;

app.use(serverError);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at port ${PORT} `);
  console.log("Press CTRL+C to Stop Server");
});
