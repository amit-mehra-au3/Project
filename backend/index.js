var express =require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var mongoClient= require('mongodb').MongoClient;
var url ='mongodb://127.0.0.1:27017';

var db;
mongoClient.connect(url,function(err,client){
    if(err)
        throw err;
    db= client.db('attainu');
})
var app = express();
app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.set('view engine','hbs');
app.get('/students',function(req,res){
    db.collection('students').find({}).toArray(function(err,result){
        if(err)
            throw err;
        res.render('index.hbs',{
            heading:'Students Details',
            style:'main.css',
            array:result,
            va1:'active',
            script:'add.js'
        })
    })
})



app.get('/students/add',function(req,res){
    res.render('add.hbs',{
        script:'../add.js',
        style:'../main.css'
    })
})
app.post('/students/student',function(req,res){
    db.collection('students').insertOne(req.body);    
    // console.log(req.body);
    res.send('/students')
})

app.delete('/students/student/:id',function(req,res){
    db.collection('students').deleteOne({_id:require('mongodb').ObjectID(req.params.id)},function(err,result){
        if(err)
            throw err;
    res.send('Deleted');
    })  
});




app.get('/instructors',function(req,res){
    db.collection('instructors').find({}).toArray(function(err,result){
        if(err)
            throw err;
        res.render('index.hbs',{
            heading:'Instructors Details',
            style:'main.css',
            va2:'active',
            array:result,
            script:'add.js'
        })
    })
})




app.listen(3000,function(){
    console.log("Port Running on 3000");
})