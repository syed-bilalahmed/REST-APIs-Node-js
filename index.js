const express = require("express");
const app = express();
const path = require("path");

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Array of posts
let posts = [
    {   id:"1",
        username: "Bilal",
        content: "I love Coding",
        avatar: "https://picsum.photos/200"  // Example URL from Lorem Picsum for a 200x200 image
    },
    {
        id:"2",
        username: "Sara",
        content: "I love Eating",
        avatar: "https://picsum.photos/200"  // Example URL from Lorem Picsum for a 200x200 image
    }
    // Add more posts as needed
];


// Route to render the index.ejs template
app.get("/posts", (req, res) => {
    res.render("index", { posts }); // Passing 'posts' array to the template
});

app.get("/posts/newpost", (req, res) => {
    res.render("createForm.ejs")
});
app.post("/posts/", (req, res) => {
    let { username, content,avatar } = req.body;

    
    let newPost = { username, content,avatar };

 
    posts.push(newPost);
    res.redirect("/posts")
});
app.get("/posts/:id", (req,res)=>{
    let {id}=req.params;
    let post= posts.find((p)=> id===p.id );
    res.render("showPost",{ post})
    // res.redirect("/posts")
    // console.table(post);
}) 

// Start server
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
