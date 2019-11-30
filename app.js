var bodyParser       = require("body-parser"),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    app              = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/", function(req, res){
    res.send("blogs");
});


app.get("*", function(req, res){
    res.send("DNE");
});


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function(){
    console.log('Server listening on port', app.get('port'));
}); 
