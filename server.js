
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var reservations = [
    {
      name: "Nirav",
      phoneNumber: 2222222222,
      email: "sampleEmail@gmail.com",
      uniqueId: "banana123" 
    }
  ];

  var waitlistPeople = [
    {
     name: "NotNirav",
     phoneNumber: 3333333333,
     email: "sampleEmail2@gmail.com",
     uniqueId: "apple123" 
    }
  ];

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation_news.html"));
  });

  app.get("/reservations", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation_form.html"));
  });
  
  app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
  });

  app.get("/api/waitlist", function(req, res) {
    return res.json(waitlistPeople);
  });

function postReservation(){
    app.post("/api/reservations",function(req,res){
        var newReservation = req.body;
        if(reservations.length >= 5){
            waitlistPeople.push(newReservation);
            res.json(newReservation);
            return false;
        }else{
            reservations.push(newReservation);
            res.json(newReservation);
            return true;
        }
    })
}
postReservation();







  









app.listen(PORT,function(){
    console.log("App listening on PORT " + PORT);
})