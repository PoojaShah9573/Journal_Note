//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');



let app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));


const homeStartingContent = "";

const aboutContent = "I am Pooja Shah . Student of computer science and Engineering.I am From Kathmandu, Nepal. I have completed my high School and Primary School in Kathmandu, Nepal from Modern Indian School. Currently i am in 3rd year pursuing my B.tech degree in Computer Science and Engineering. ";

const contactContent = "I'd love if you reached out to me. Even if it's just to say Hey!. You can contact me through any of my socials.";

const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://admin-puja:test123@cluster0.6qrl2.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema={
  title: String,
  content :String
};

const Post = mongoose.model("Post",postSchema);



app.get("/",function(req,res){

  Post.find({},function(err,posts){
     res.render("home",{
       startingContent:homeStartingContent,
        //items:items,
        posts:posts
  });
  });
  //console.log(items);
});


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

 const post = new Post ({
  title: req.body.postTitle,
  content: req.body.postBody
 });

  post.save(function(err){
   if (!err){
       res.redirect("/");
   }

 });
 //res.redirect("/");
});

//DYNAMIC URL
app.get("/posts/:postId",function(req,res){
  //const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;

  Post.findOne({_id:requestedPostId},function(err,post){
    res.render("post",{
      title:post.title,
      content:post.content
    });

    });
});

app.post("/delete", function(req, res){
  const deletePost = req.body.deletePost;
  Post.findOneAndRemove({title: deletePost}).then(res.redirect("/"));
});

let port = process.env.PORT;
 if (port == null || port == "") {
   port = 3000;
 }

app.listen(port, function() {
  console.log("Server has started.");
});


