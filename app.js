
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
            // console.log(blogs)
            res.render("index", {blogs:blogs} );            
        }
    });

});

// NEW BLOG
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE NEW BLOG
app.post("/blogs", function(req,res){

    req.body.blog.body = req.sanitize(req.body.blog.body); // removes script tag from body
    Blog.create(req.body.blog, function(error, newBlog){
        if(error){
            res.render("new");
        }else{
            console.log("newBlog.body");
            console.log(newBlog.body);
            res.redirect("/blogs");
        }
    });
});

// SHOW BLOG 
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(error, foundBlog){
        if(error){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: foundBlog});
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
