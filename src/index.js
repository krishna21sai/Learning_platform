const express = require("express")
const app = express()
const path = require("path")
const ejs = require("ejs")
const temlatepaths = path.join(__dirname,'../templates')
const collection = require("./mongodb")

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../images')));
app.use(express.static(path.join(__dirname, '../javascript')));

app.use(express.json())
app.set("view engine","ejs")
app.set("views",temlatepaths)
app.use(express.urlencoded({extended:false}))
app.listen(3000,()=>{
    console.log("http://localhost:3000")
})

app.get('/',(req,res)=>{
    res.render("signup")
})

app.get('/signup',(req,res)=>{
    res.render("signup")
})

app.post('/signup', async (req, res) => {
    try {
        const data = new collection({
            name: req.body.username, 
            password: req.body.password
        });

        await data.save();

        res.redirect('home');
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).send("An error occurred. Please try again.");
    }
});


app.get('/login',(req,res)=>{
    res.render("login")
})
app.post('/login',async(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    console.log(username)
    const user = await collection.findOne({name:username,password:password  })
    console.log(user)
    if(user){
        res.render("home")
    }
    else{
        res.send("Error")
    }

})
app.get('/home',async(req,res)=>{
    const users = await collection.find()
    console.log(users)
    res.render('home',{users})
})

app.get('/addcourse',(req,res)=>{
    res.render('addcourse')
})