const express = require('express');
const app = express();
var path = require('path');
const port = 3000;
let options = {};

// express.static(root, [options]);
app.use(express.static('assets'));


app.get('/', (req, res) => {

});

app.listen(port, () => console.log(`Server side working`));