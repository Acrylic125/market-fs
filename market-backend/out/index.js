"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;
app.use(function (req, resp, next) {
    console.log("Test!", req.url, req.protocol);
    next();
});
app.get('/:id&test', function (req, resp) {
    console.log(req.params);
});
app.get('/', function (req, resp) {
    resp.json({
        name: "ABC",
        id: 1,
        age: 16,
        gender: 'F',
        scheme: {
            type: 'LITE',
            cost: 1000
        }
    });
});
app.post('/hello', function (req, res) {
    res.send("You just called the post method at '/hello'!\n");
});
app.listen(PORT, function () {
    return console.log("Running on port " + PORT);
});
