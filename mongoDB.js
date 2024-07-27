
const mongoose = require('mongoose');

const database = 'Libaray';
// mongodb+srv://admin:admin@cluster0.l2lbhpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect(`mongodb://0.0.0.0:27017/${database}?directConnection=true`)
  .then(() => console.log('Mongoose is Connected..........!'));
