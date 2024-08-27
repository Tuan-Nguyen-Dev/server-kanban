import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./src/router/user";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());

app.use(cors());

const MONGODB = `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASA_PASSWORD}@cluster0.eepux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use("/auth", userRouter);
const conectDB = async () => {
  try {
    await mongoose.connect(MONGODB);
    console.log("Connected to MongoDB Server");
  } catch (error) {
    console.log("Error: ", error);
  }
};

conectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Starting server on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
