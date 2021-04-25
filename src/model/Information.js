import mongoose from "mongoose";
import Enterprise from "./Enterprise";
import Student from "./Student";
import Comment from "./Comment";
import Message from "./Message";

const InformationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },
  pay: {
    type: Number,
  },
  condition: {
    type: String,
    trim: true,
  },
  postTime: {
    type: Date,
    default: Date.now,
  },
  reply: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  enterprise: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Enterprise",
  },
  studentsCollect: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
    },
  ],
  studentsFollow: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
    },
  ],
  studentsUnFollow: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
    },
  ],
  students: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
    },
  ],
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment",
    },
  ],
  messages: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message",
    },
  ],
});

const Information = mongoose.model("Information", InformationSchema);
export default Information;
