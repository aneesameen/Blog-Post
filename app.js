const express = require("express");
const body = require ("body-parser");
const _ = require("lodash");
const mongoose = require ("mongoose");
const port = 3000;
const contact = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur a impedit laudantium sunt nesciunt minus expedita nam placeat vitae, voluptatibus architecto ab obcaecati, reprehenderit doloremque, assumenda debitis voluptas soluta. Porro quisquam aperiam aliquid repellendus ex nisi cupiditate ea facilis officia consequuntur id earum cumque, odit facere illum consectetur enim nesciunt quibusdam explicabo debitis ab? Perferendis est quibusdam magnam voluptatibus. Commodi neque sint ipsam expedita quos aspernatur praesentium quis et, exercitationem recusandae. Repellat similique laudantium odit sequi voluptatibus sint? Quidem natus accusamus impedit. Ducimus quis distinctio ipsam autem ut?"
const about = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"

const app = express();

app.use(body.urlencoded({extended:true}));
app.use(express.static("public"))
app.set("view engine", "ejs");

mongoose.set('strictQuery', false);
// mongoose.connect("mongodb://127.0.0.1/blogDB");
mongoose.connect("mongodb+srv://aneesblog:knYUtTdIIjFdncZ9@blog.0lhvgjc.mongodb.net/?retryWrites=true&w=majority")

const blogSchema = new mongoose.Schema({
    tittle : String,
    content : String
})

const Blog = mongoose.model("Blog", blogSchema);



app.get("/", (req, res) => {

    Blog.find((err, posts)=>{
        if(err){
            console.log(err)
        }else{
            res.render("home", {blogs:posts});
        }
    })
})

app.get("/about", (req, res) => {
    res.render("about", {about:about});
})

app.get("/contact", (req, res) => {
    res.render("contact", {contact:contact});
})

app.get("/compose", (req, res) => {
    res.render("compose");
})

app.get("/blogs/:blogid", (req, res) => {
    const blogid = req.params.blogid;

    Blog.findOne({_id:blogid}, (err, foundblog) => {
        if(err){
            console.log(err)
        }else{
            res.render("blog", {blogTittle:foundblog.tittle, blogContent:foundblog.content, blogId:foundblog._id})
        }
    })
})


app.post("/compose", (req, res) => {

    const blog = new Blog({
        tittle : req.body.heading,
        content : req.body.blog
    })
    blog.save();

    res.redirect("/");
})


app.post("/delete", (req,res) => {
    console.log(req.body.delete)
    Blog.deleteOne({_id : req.body.delete}, (err) => {
        if(err){
            console.log(err)
        }else{
            console.log("deleted");
        }
    })
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
