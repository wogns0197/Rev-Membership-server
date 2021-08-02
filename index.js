import { AuthURL } from './AUTH.js';
import {ClientData} from './models/ClientData.js';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

const app = express();

const CONNECTION_URL = AuthURL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
  .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// register Client Data
app.post('/api/registerData', (req, res) => {
  const data = ClientData(req.body);  
  console.log(data); // test
  data.save((err) => {
    if (err) return res.json({ message: err.message });
  });
  return res.status(200).json({
    success: true,
  })
});

// update Client Data
app.post('/api/updateData', (req, res) => {
  console.log(req.body);
  ClientData.updateOne({ phonenumber: req.body.phonenumber }
    , {
      $set: { point: req.body.point },
      $set: { buycount: req.body.buycount},
      $push: {pointhistory: req.body.pointhistory}
      // buycount: req.body.buycount,
    }, (err) => {
      if (err) return res.json({ message: err.message });
  });
  return res.status(200).json({
    success: true,
  })
});

//get Client Data
app.post('/api/getData', (req, res) => {
  ClientData.findOne({ "phonenumber": req.body.phonenumber })
    .then(data => {
      console.log(res.json(data)); // test
      return res.json(data);
    })
    .catch(err => console.log(err));
});

// kill server port
// netstat -tnlp
// sudo fuser -k -n tcp 5000