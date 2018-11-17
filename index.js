const express = require('express');
const app = express();
const port = 3000;
var mysql = require('mysql');

// let FACE_ANGRY = 0.01;
// let FACE_DISGUST = 0.01;
// let FACE_FEAR = 0.01;
// let FACE_HAPPY = 0.01;
// let FACE_SAD = 0.01;
// let FACE_SURPRISE = 0.01;
// let FACE_NEUTRAL = 0.1;

app.use(express.static('assets'));

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: 'face'
//   });

//   con.connect(function(err) {
//     if (err) throw err;
//     // console.log("Connected!");

//     var sql = "INSERT INTO face_get (face_angry, face_disgust, face_fear, face_happy, face_sad, face_surprise, face_neutral) VALUES (" + FACE_ANGRY + ','+FACE_DISGUST+','+FACE_FEAR+','+FACE_HAPPY+','+FACE_SAD+','+FACE_SURPRISE+','+FACE_NEUTRAL+')';
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Record saved " + result.insertId);
//     });

// var sql = "CREATE TABLE face_get (id INT AUTO_INCREMENT PRIMARY KEY, face_angry FLOAT, face_disgust FLOAT, face_fear FLOAT, face_happy FLOAT, face_sad FLOAT, face_surprise FLOAT, face_neutral FLOAT)";

// con.query('CREATE DATABASE face', function (err, result) {
//   if (err) throw err;
// })

// con.query('SELECT * FROM face_get', function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// });

// });

app.listen(port, () => console.log(`Server side working`));