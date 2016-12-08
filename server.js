var express = require('express');
var app = express();
var api = require("./api");

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/api', api);

app.get('/', function(req, res){
   
   res.render('index');
    
});



app.listen(process.env.PORT || "8080", process.env.IP || "0.0.0.0", function(){
   console.log("server running"); 
});
