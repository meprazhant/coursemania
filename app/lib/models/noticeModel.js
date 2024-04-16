import { Schema, models, model } from "mongoose";
const noticeModel = new Schema(
  {
    notice: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  {
    timestamps: true,
  }
);

const Notice = models.Notice || model("Notice", noticeModel);

export default Notice;
