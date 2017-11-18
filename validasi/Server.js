var express = require('express');
var app = express();
var port = process.env.PORT || 8060;
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/User');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/tutorial', function(err){
    if (err){
        console.log('Not Connected to the database: ' + err);

    }else{
        console.log('Successfully Connected to MongoDB');
    }
});

app.post('/users',function(req,res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save();
    res.send('user created');
    
});

app.listen(port,function(){
    console.log('Running the server ' + port)
}
);