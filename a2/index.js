//a2 index.js 

"use strict"

//define variables
var http = require("http"), fs = require("fs"), qs = require("querystring"), boats = require("./lib/boats");

//function serveStatic
function serveStatic(res, path, contentType, responseCode){
    
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data){
        if(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error. Its not you, its me');
    }//end error if statement
    else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
        
        }//end else statement
        
    });//end readFile
    
}//end serveStatic()


//begin createServer()
http.createServer(function(req, res){
    
    let url = req.url.split("?"), params = qs.parse(url[1]), path = url[0].toLowerCase();
    
    //begin switch statement
    switch (path) {
        
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('All aboard!')
            break;
        
        case '/about':
            serveStatic(res, '/../public/home.html', 'text/html');
            res.end('About');
            break;
            
        case '/search':
            let found = boat.get(params.type);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let results = (found) ? JSON.stringify(found) : "Hmm, we couldn't find that one.";
            res.end("We have found a " + params.type + "\n" + results);
            break; 
            
        case '/add':
            boats.add(params);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('You have just added the boat ' + '\n' + 'type:' + params.type + 'year: ' + params.year + 'beam: ' + params.beam + 'length: ' + params.length + 'price: ' + params.price);
            break;
            
        case '/delete':
            var deletethis = boats.delete(params.type);
            console.log(boats.delete(params.type))
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('You have just removed the boat ' + '\n' + 'type:' + params.type + 'year: ' + params.year + 'beam: ' + params.beam + 'length: ' + params.length + 'price: ' + params.price);

        
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404; Page not found.');
    }//end switch
    
}).listen(process.env.PORT || 3000);//end createServer()