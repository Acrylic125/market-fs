var express = require('express');
var app = express();

const PORT = process.env.PORT || 5000;

app.use((req, resp, next) => {
    console.log("Test!", req.url, req.protocol);
    next();
})

app.get('/:id&test', (req, resp) => {
    console.log(req.params);
});

app.get('/', (req, resp) => {
    resp.json({
        name: "ABC",
        id: 1,
        age: 16,
        gender: 'F',
        scheme: {
            type: 'LITE',
            cost: 1000
        }
    })
});
 
 app.post('/hello', function(req, res){
    res.send("You just called the post method at '/hello'!\n");
 });

app.listen(PORT, () => 
    console.log(`Running on port ${PORT}`));