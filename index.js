const express = require('express');
const app = express();
const port = 3000;
var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
app.use(express.static('assets'));

app.listen(port, () => console.log(`Server side working`));