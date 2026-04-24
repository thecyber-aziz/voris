import mongoose from 'mongoose';
import { z } from "zod"

const chatSchema = new mongoose.Schema({
  userId: {type: String},
  guestId: {type: String},
  title: {type: String},
  messages: {type: Array, default: []}
}, {timestamps: true, versionKey: false})

const Chat = mongoose.model('chat', chatSchema);
export default Chat;


