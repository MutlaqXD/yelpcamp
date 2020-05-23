const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs');

//database connection :
mongoose.connect('mongodb://localhost:27017/yelpcamp', {useNewUrlParser: true, useUnifiedTopology: true});

// creating a schema for campgrounds .

var campgroundsSchema = new mongoose.Schema({
    name:String,
    image:String
});

var Campground = mongoose.model("Campground",campgroundsSchema);




var campgrounds = [
    {name:"mutlaq",image:"https://picsum.photos/200/200"},
    {name:"شسيسي",image:"https://picsum.photos/200/200"},
    {name:"mutlaq",image:"https://picsum.photos/200/200"},
    {name:"شسيسي",image:"https://picsum.photos/200/200"},
    {name:"mutlaq",image:"https://picsum.photos/200/200"},
    {name:"شسيسي",image:"https://picsum.photos/200/200"},
    {name:"mutlaq",image:"https://picsum.photos/200/200"},
    {name:"شسيسي",image:"https://picsum.photos/200/200"}
];

app.get('/',function(req,res){
    res.render('landingPage');
});


app.get('/campgrounds/new',function(req,res){
    res.render('addCampground');
});

app.post('/campgrounds',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var currentObject = {name:name,image:image};
    if(campgrounds.push(currentObject)){
        res.redirect('/campgrounds');
    }else{
        res.send("Sorry, there's an error!");
    }

});

app.get('/campgrounds',function(req,res){
    res.render('campgrounds',{campgrounds:campgrounds});
});


// server 
app.listen(port,function(){
    console.log(`The YelpCAMP server has been started at @ http://localhost:${port}`);
    
});