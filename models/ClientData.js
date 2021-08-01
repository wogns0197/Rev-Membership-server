import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
  key: String,
  name: String,
  phonenumber: String,
  point: Number,
  buycount: Number,
});



export const ClientData = mongoose.model('DBdata', dataSchema);

