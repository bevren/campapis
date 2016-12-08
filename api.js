var express = require("express")
var router = express.Router()

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var urlDB = [];
var urlDBIndex = 0;

router.get('/timestamp', function(req, res) {
   res.render('timestamp'); 
});

router.get('/timestamp/:id', function(req,res){
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


router.get('/whoami/', function(req, res) {
    
    var objToSend = {};
    
    objToSend["ip"] = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    objToSend["language"] = req.headers['accept-language'].split(';')[0].split(',')[0];
    var software = req.headers['user-agent'].match('[\\(].*?[A-Za-z0-9][\\)]')[0];
    software = software.slice(1, software.length-1);
    objToSend["software"] = software;
    res.send(objToSend);
});

router.get('/shorten', function(req, res) {
   res.render('shorten'); 
});

router.get('/shorten/new/:url*', function(req, res,next) {
    var originalUrl = req.params.url + req.params[0];
    
    var m = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(originalUrl);
    
    if(m){
        
        for(var i=0; i < urlDB.length; i++){
            if(urlDB[i].original_url === originalUrl){
                return res.send(urlDB[i]);
            }
        }
        
        var objToSend = {original_url:originalUrl, short_url:"https://timestamp-duxducis.c9users.io/api/shorten/"+urlDBIndex.toString()};
        urlDB.push(objToSend);
        urlDBIndex++;
        return res.send(objToSend);
    }
    else{
        return res.send({error:"Invalid URL."});
    }
    
    
});

router.get('/shorten/:id', function(req, res) {
    var id = req.params.id;
    
    if(urlDB[id]){
        res.redirect(urlDB[id].original_url);
    }
    else{
        res.send({error:"Nothing found.!"})
    }
    
});


module.exports = router;