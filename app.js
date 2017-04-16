console.log("Hello world ");
const fs = require("fs");
// Express use
const express = require("express");

var app = express();
// var imageInfo =[];
//set public folder public
app.use(express.static(__dirname));

app.get("/", function(req, res) {
  res.sendFile('./index.html');
})
app.get("/image/add", function(req, res) {
  fs.readFile("imageData.json", "utf-8", (err, data) => {
  imageInfo = JSON.parse(data);
  imageInfo.push(
    {
      name : req.query.name,
      imageLink : req.query.imageLink,
      description : req.query.description
    }
  );
  fs.writeFileSync('imageData.json', JSON.stringify(imageInfo));
  });
  res.send("Success");
})

app.get("/image/get", (req, res) => {
  fs.readFile("imageData.json", "utf-8", (err, data) => {
  imageInfo = JSON.parse(data);
  var album;
  for (let i=0; i< imageInfo.length; i++) {
    album += "<div><p>"+imageInfo[i].name+"</p><img src="+imageInfo[i].imageLink+"><p>"+imageInfo[i].description+"</div>"
  }
  res.send(album);
  // document.getElementById("first").src=imageInfo[0].imageLink;
  // console.log(imageInfo[0].imageLink);
  // res.send(imageInfo.imageLink)
});

});
// open port to use local host
app.listen(6969, (req, res) => {
  console.log("app listen on 6969");
})
