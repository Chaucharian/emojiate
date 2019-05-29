const https = require('https');
const express = require('express');
const fs = require('fs');
var path = require('path');

const app = new express();
/*
const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname+'/server.key')),
    cert: fs.readFileSync(path.join(__dirname+'/server.crt')),
}, app);*/
app.listen(3000, () => console.log('server running at https://localhost:3000 !'));

app.use(express.static(path.join(__dirname, '/app')));
app.use('/libs', express.static('/app/libs') );

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});
