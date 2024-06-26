import express from "express";
import { config } from "dotenv";
import { serverError } from "./middleware/error.middleware.js";
import routes from "./routes/index.js";
import { connectDb } from "./db/connectDb.js";
import bodyParser from "body-parser";
import cors from "cors";
import { app, server } from "./socket.js";

config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("src/uploads"));

const PORT = process.env.PORT || 4000;
app.use(routes);

app.use(serverError);

server.listen(PORT, () => {
  connectDb();
  console.log(`Server Started at port ${PORT} `);
  console.log("Press CTRL+C to Stop Server");
});
