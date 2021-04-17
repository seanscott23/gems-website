import mongoose, { model, Schema } from "mongoose";
import { UserPropsModel } from "../typescript/models";

const UserSchema = new mongoose.Schema<UserPropsModel>(
  {
    clips: [{ type: Schema.Types.ObjectId, ref: "Clip" }],
    firstName: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<UserPropsModel>("User", UserSchema);
export default User;
