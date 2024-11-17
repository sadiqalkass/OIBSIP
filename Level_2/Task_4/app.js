require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const encrypt = require("mongoose-encryption")


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/userInfoTB")

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    secret: String
})

const secret = process.env.SECRET
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["secret", "password"]})
const User = mongoose.model('user', userSchema)


app.get("/", (req,res)=>{
    res.render('home')
})
app.get("/about", (req,res)=>{
    res.render('about')
})

app.get("/login", (req,res)=>{
    res.render('login',  {errmsg: " "})
})

app.get("/signup", (req,res)=>{
    res.render('signup', {errmsg: " "})
})

app.post("/signup", (req,res)=>{
    const findUser = async () =>{
        const user = await User.findOne({email : req.body.email})
        console.log(user)
        if (user) {
            res.render("signup",{errmsg: "You Already Have an Account"})
        } else {
            const newUser =  new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                secret: req.body.secret
            })
            newUser.save().then(()=> console.log("Saved Dta"))
            res.render("post", {
                post: req.body.secret,
                username: req.body.username
            })      
        }
    }

    findUser()
})

app.post('/login', (req,res)=>{
    const findLogUser = async ()=>{
        const logedUser = await User.findOne({email: req.body.email})
        if (logedUser.email === req.body.email && req.body.password === logedUser.password) {
            res.render('post',{
                post: logedUser.secret,
                username: logedUser.username
            })
        }else{
            res.render('login', {errmsg: "Incorrect password or username"})
        }
    }
    findLogUser()
})

app.listen(3000, ()=>{
    console.log("Server up at port 3000...")
})