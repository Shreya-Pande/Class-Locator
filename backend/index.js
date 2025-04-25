import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js"
const app = express();

app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI= process.env.MongoDBURI;

// connect to mongodb

try{
mongoose.connect(URI,{
  // useNewUriParser :false,
  useUnifiedTopology :true
});
console.log("Connected to mongodb")
}catch(error){
console.log("Error:", error);
}

//defining routes
app.use("/api/book",bookRoute)
app.get("/", (req, res) => {
  const { block, dayOfWeek, startTime, endTime } = req.query;
  res.send("API is running. Use /book with query parameters.");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})


// Handle SIGTERM and SIGINT signals to gracefully shut down the server
process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated');
    });
  });
  
  process.on('SIGINT', () => {
    server.close(() => {
      console.log('Process interrupted');
    });
  });