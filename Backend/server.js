const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const tipsRoutes = require("./routes/tipsRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const kisanAiRoutes = require("./routes/kisanAI.route");
console.log("tipsRoutes imported");


app.use(cors({
  origin: ["http://localhost:5174",
            "http://localhost:5173",
             "https://kisan-connect-p8p7.vercel.app"
             
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use("/api/users" , userRoutes);
app.use("/tips" , tipsRoutes);
app.use('/tips', commentsRoutes);
app.use("/api/kisanai" , kisanAiRoutes);

app.listen(3000 , ()=>{
    console.log("Server is runing on http://localhost:3000");
}); 