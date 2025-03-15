import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import { app,server,io } from "./src/lib/Socket.js";
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json({limit:"70mb"}));
app.use(express.urlencoded({ limit:"70mb",extended: false,parameterLimit:50000 }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use('/api/message',messageRoutes)

server.listen(PORT, function () {
  console.log("Server is running on 5001");
  connect();
});
