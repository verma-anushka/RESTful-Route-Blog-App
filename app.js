
var bodyParser       = require("body-parser"),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose         = require("mongoose"),
    path             = require("path"),
    express          = require("express"),
    app              = express();


var db = require('./database.js');
var Blog = require("./blogs.js");

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static("public"));
app.set("view engine","ejs");

Blog.create({
    title: "b1",
    image: "https://cdn.pixabay.com/photo/2015/06/01/09/04/blog-793047_960_720.jpg",
    body: "b1 description"
}, function(error, blog){
    if(error){
        console.log(error);
    }else{
        console.log("Blog Added");
        
    }
});

// ROUTES

// HOMEPAGE
app.get("/", function(req, res){
    res.send("blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){

    Blog.find({}, function(error, blogs){
        if(error){
            console.log("error");
        }else{
            console.log(blogs)
            res.render("show.ejs", {blogs:blogs} );            
        }
    });

});

app.get("*", function(req, res){
    res.send("sorry DNE");
});


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function(){
    console.log('Server listening on port', app.get('port'));
}); 
