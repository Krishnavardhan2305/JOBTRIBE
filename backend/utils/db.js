import mongoose from 'mongoose';

const connectMongoDb = async () => {
  // console.log("Inside DB file:", process.env.MONGO_URI); 
  await mongoose.connect(process.env.MONGO_URI);
  console.log(" Database connection succesful");

};

export default connectMongoDb;
