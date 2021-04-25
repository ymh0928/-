import mongoose from "mongoose";
import Information from "./Information";
import Student from "./Student";

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  posttime: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Student",
  },
  target: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Information",
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
