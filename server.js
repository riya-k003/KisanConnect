const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const tipsRoutes = require("./routes/tipsRoutes");
console.log("tipsRoutes imported");



app.use(express.json());

app.use("/api/users" , userRoutes);
app.use("/tips" , tipsRoutes);


app.listen(3000 , ()=>{
    console.log("Server is runing on http://localhost:3000");
});