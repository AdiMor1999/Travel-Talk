import mongoose, { Document, Schema, Types } from "mongoose";


// Define User schema
export interface IUser {
  email: string;
  password: string;
  _id?: string;
  refreshTokens?: string[];
  name: string;
  profilePhoto?: string;
  aboutMe?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshTokens: {
    type: [String],
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
  },
  aboutMe: {
    type: String,
  },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
