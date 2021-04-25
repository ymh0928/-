import mongoose from "mongoose";
import Enterprise from "./Enterprise";
import Information from "./Information";
import Comment from "./Comment";
import Message from "./Message";

const StudentSchema = new mongoose.Schema({
  sName: {
    type: String,
    unique: true,
    trim: true,
  },
  tName: {
    type: String,
    trim: true,
  },
  sWord: {
    type: String,
    trim: true,
  },
  sMail: {
    type: String,
    unique: true,
  },
  sPhone: {
    type: String,
    unique: true,
  },
  token: String,
  avatar: String,
  informations: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Information",
    },
  ],
  informationsCollect: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Information",
    },
  ],
  informationsFollow: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Information",
    },
  ],
  informationsUnFollow: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Information",
    },
  ],
  enterprises: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Enterprise",
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

const Student = mongoose.model("Student", StudentSchema);
export default Student;
