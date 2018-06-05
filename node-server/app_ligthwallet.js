var express = require("express")
var app = express()

app.use(express.static("public-ligthwallet"))

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public-ligthwallet/html/index.html");
})

app.get("/contract.html", function(req, res){
	res.sendFile(__dirname + "/public-ligthwallet/html/contract.html");
})

app.get("/a.html", function(req, res){
	res.sendFile(__dirname + "/public-ligthwallet/html/a.html");
})

app.get("/b.html", function(req, res){
	res.sendFile(__dirname + "/public-ligthwallet/html/b.html");
})

app.get("/c.html", function(req, res){
	res.sendFile(__dirname + "/public-ligthwallet/html/c.html");
})

app.get("/d.html", function(req, res){
	res.sendFile(__dirname + "/public-ligthwallet/html/d.html");
})

app.get("/e.html", function(req, res){
	res.sendFile(__dirname + "/public-ligthwallet/html/e.html");
})

app.listen(3000)
console.log('Server is running')