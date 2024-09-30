import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const getAccessToken = async (payload: {
  _id: Types.ObjectId;
  email: string;
  rule: number;
}) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY as string);

  return token;
};
