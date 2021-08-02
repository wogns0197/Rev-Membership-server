import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
  key: String,
  name: String,
  phonenumber: String,
  point: Number,  
  pointhistory: [{
    date: String,
    point: Number,    
  }],
  buycount: Number,
  registertime: String,
});



export const ClientData = mongoose.model('DBdata', dataSchema);

