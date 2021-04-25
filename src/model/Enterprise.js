import mongoose from "mongoose";
import Student from "./Student";
import Information from "./Information";
import Comment from "./Comment";
import Message from "./Message";

const EnterpriseSchema = new mongoose.Schema({
  eName: {
    type: String,
    unique: true,
    trim: true,
  },
  cName: {
    type: String,
    unique: true,
    trim: true,
  },
  eWord: {
    type: String,
    trim: true,
  },
  area: {
    type: String,
    trim: true,
  },
  eMail: {
    type: String,
    unique: true,
  },
  ePhone: {
    type: String,
    unique: true,
  },
  token: String,
  logo: String,
  informations: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Information",
    },
  ],
  students: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
    },
  ],
  messages: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message",
    },
  ],
});

const Enterprise = mongoose.model("Enterprise", EnterpriseSchema);
export default Enterprise;
