import mongoose, { model, Schema } from "mongoose";
import { ClipPropsModel } from "../typescript/models";

const ClipSchema = new mongoose.Schema<ClipPropsModel>(
  {
    // ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    // title: {
    //   type: String,
    //   required: true,
    // },
    // description: {
    //   type: String,
    //   required: false,
    // },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Clip = model<ClipPropsModel>("Clip", ClipSchema);
export default Clip;
