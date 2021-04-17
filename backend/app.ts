import express from "express";
import bodyParser from "body-parser";
import users from "./routes/api/users";

// import clips from "./routes/api/clips";
const app = express();
import mongoose, { ConnectOptions } from "mongoose";
const uri: string | any = process.env.MONGO_URI;
const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(uri, options);

// app.use("/api/users", users);
// app.use("/api/clips", clips);

// app.use("/api/users", users);

const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
