const express = require('express');
const app = express();

//port number assigned to server
const port = 8000;


//database
const db = require('./config/mongoose');

//JSOn parser
app.use(express.urlencoded());
app.use(express.json());

//routes redirected to routes
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) { console.log(err); return; }
    
    console.log(`Server running on port ${port}`);
})