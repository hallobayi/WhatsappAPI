import express from "express";
import cors from "cors";
import messageRouter from "./routers/messageRouter.js";
import { startClient } from "./services/WhatsappClient.js";
import { globalError } from "./utils/globalError.js";
import dbConnection from "./database/connection.js";

const app = express();
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  credentials: true, // Allow credentials to be sent with requests
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
dbConnection();
app.use(globalError);
app.use(messageRouter);
startClient(4);
app.listen(3000, () => console.log(`Server is ready in on port 3000`));