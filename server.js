var express = require('express');
var app = express();

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

app.get('/:id', function(req,res){
    
    var objToSend = {unix:"", natural:""};
    
    var unixToDate = new Date(req.params.id * 1000);
    
    if(unixToDate == 'Invalid Date'){
        unixToDate = new Date(req.params.id);
        
        if(unixToDate == 'Invalid Date'){
            objToSend["unix"] = null;
            objToSend["natural"] = null;
        }else{
            var unix = Math.floor(unixToDate / 1000);
            objToSend["unix"] = unix;
            objToSend["natural"] = req.params.id;
        }
    }
    else{
        var natural = months[unixToDate.getMonth()] + " " + unixToDate.getDate().toString() + ", " + unixToDate.getFullYear().toString();
        objToSend["unix"] = req.params.id;
        objToSend["natural"] = natural;
    }
    
    res.send(objToSend); 
});


app.listen(process.env.PORT || "8080", process.env.IP || "0.0.0.0", function(){
   console.log("server running"); 
});

function isInt(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}