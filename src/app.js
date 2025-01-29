import express from "express";
import connectDb from "./config/dbconnect.js";
import routes from './routes/index.js';
import errorHandler from "./midlewares/errorHandler.js";
import handler404 from "./midlewares/handler404.js";

const connection = await connectDb();
connection.on("error", (error) => {
  console.error("Connection Error: ", error);
});

connection.once("open", () => {
  console.log("Connection db success");
})

const app = express();
app.use(express.json());
routes(app);

app.use(handler404);

app.use(errorHandler);

export default app;