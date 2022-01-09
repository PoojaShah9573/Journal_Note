//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

let app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));



const items=[];

const homeStartingContent = "Welcome to my Diary ! ";

const aboutContent = "I am Pooja Shah . Student of computer science and Engineering.I am From Kathmandu, Nepal. I have completed my high School and Primary School in Kathmandu, Nepal from Modern Indian School. Currently i am in 3rd year pursuing my B.tech degree in Computer Science and Engineering. ";

const contactContent = "I'd love if you reached out to me. Even if it's just to say Hey!. You can contact me through any of my socials.";


app.get("/",function(req,res){
  res.render("home",{
    ContentHome:homeStartingContent,
    items:items
  });
  //console.log(items);
})


app.get("/about",function(req,res){
  res.render("about",{ContentAbout:aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{ContentContact:contactContent});
})


app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
 //let type=req.body.PostBody;
 //console.log(type);

 const post={
  title: req.body.TitleBody,
  content: req.body.PostBody
  };

 items.push(post);
 res.redirect("/");

});

//DYNAMIC URL
app.get("/items/:postName",function(req,res){
const requestedTitle = _.lowerCase(req.params.postName);

  items.forEach(function(post){
  const storeTitle = _.lowerCase(post.title);

   if(requestedTitle === storeTitle )
   {
   //console.log("Match Found!");
   res.render("post",{
     title:post.title,
     content:post.content
   });
   }

    });
});





app.listen(3000 || process.env.PORT, function() {
  console.log("Server started on port 3000");
});


