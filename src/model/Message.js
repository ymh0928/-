import mongoose from "mongoose";
import Enterprise from "./Enterprise";
import Information from "./Information";
import Student from "./Student";

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    trim: true,
  },
  uploadTime: {
    type: Date,
    default: Date.now,
  },
  enterprise: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Enterprise",
  },
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Student",
  },
  information: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Information",
  },
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;
