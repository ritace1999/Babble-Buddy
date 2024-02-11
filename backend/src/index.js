import express from "express";
import { config } from "dotenv";
import { serverError } from "./middleware/error.middleware.js";
import routes from "./routes/index.js";
import { connectDb } from "./db/connectDb.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
config();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(routes);

app.use(serverError);

app.listen(PORT, (req, res, next) => {
  connectDb();
  console.log(`Server Started at port ${PORT} `);
  console.log("Press CTRL+C to Stop Server");
});
