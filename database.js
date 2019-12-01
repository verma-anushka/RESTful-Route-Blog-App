// DATABASE SETTINGS

var mongoose = require("mongoose");

var url=process.env.DATABASEURL || "mongodb://localhost:27017/blog-app";
mongoose.connect(url, { useCreateIndex: true,
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                     })
        .then(() => console.log(`Blogs database connected`))
        .catch(err => console.log(`Database connection error: ${err.message}`));