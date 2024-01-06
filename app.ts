//import env from "dotenv";
//env.config();
import express, { Express } from "express";
//import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const url= process.env.DB_URL || '';

if (!url) {
  console.error('DB_URL is not defined in the environment variables.');
  process.exit(1); // Exit the process if DB_URL is not defined
}

// mongoose.connect(url , {useNewUrlParser: true,}); try to fix it ***
app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});