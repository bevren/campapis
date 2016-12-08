var express = require('express');
var app = express();

app.get('/', function(req,res){
   res.send('Naber ula'); 
});


app.listen(process.env.PORT || "8080", process.env.IP || "0.0.0.0", function(){
   console.log("server running"); 
});