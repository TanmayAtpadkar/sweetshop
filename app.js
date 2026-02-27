const express = require("express");
const authroutes = require('./routes/authroutes');
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'pages','login.html'));
})

app.use('/api/auth',authroutes)






module.exports = app;