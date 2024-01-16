import env from "dotenv";
env.config();
import express, { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
//import userRoute from "./routes/user_route";
//import profileRoute from "./routes/profile_route";
//import postRoute from "./routes/post_route";
//import postInteractionRoute from "./routes/post_interaction_route";

const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.once("open", () => console.log("Connected to Database"));
    db.on("error", (error) => console.error(error));
    const connectionString = process.env.DB_URL;
    console.log(connectionString);
    mongoose.connect(connectionString).then(() => {
      const app = express();
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      //app.use("/user", userRoute);
      // app.use("/profile", profileRoute);
      //app.use("/post", postRoute);
      //app.use("/postInteraction", postInteractionRoute);
      resolve(app);
    });
  });
  return promise;
};

export default initApp;
