const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

//Login
app.post("/login" , (req , res) => {
    const username = req.body.username;
    const password = req.body.password;

    const mockUsername = "admin";
    const mockPassword = "admin";

    if(username === mockUsername && password === mockPassword){
        res.json({
            succuss : true,
            message : "Login Successful",
        });
    } else {
        res.json({
            succuss : false,
            message : "Login Failed",
        });
    }
});

app.get('/' , (req , res) => {
    res.send('Hello World');
});

app.listen(3000 , () => {
    console.log('Server is running on port http://localhost:3000');
});