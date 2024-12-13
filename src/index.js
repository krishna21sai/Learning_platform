const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");

// Import collections
const { UserCollection, CourseCollection } = require("./mongodb");

// Paths
const temlatepaths = path.join(__dirname, '../templates');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../images')));
app.use(express.static(path.join(__dirname, '../javascript')));

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", temlatepaths);
app.use(express.urlencoded({ extended: false }));

app.listen(3001, () => {
    console.log("http://localhost:3001");
});

// Routes
app.get('/', (req, res) => {
    res.render("signup");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});
app.post('/signup', async (req, res) => {
    try {
        const data = new UserCollection({
            name: req.body.username,
            password: req.body.password,
        });

        await data.save();
        res.redirect('home');
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).send("An error occurred. Please try again.");
    }
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);

    const user = await UserCollection.findOne({ name: username, password: password });
    console.log(user);

    if (user) {
        res.render("home");
    } else {
        res.send("Error: Invalid credentials.");
    }
});

app.get('/home', async (req, res) => {
    const users = await CourseCollection.find();
    console.log(users);
    res.render('home', { users });
});

app.get('/addcourse', (req, res) => {
    res.render('addcourse');
});

app.post('/addcourse', async(req, res) => {

    console.log(req.body);
    const courseName = req.body.className;
    let topics = req.body.topics;
    let contents = req.body.contents;
    console.log(courseName, topics, contents);

    const data1 = new CourseCollection({
        courseName : courseName,
        topics : topics,
        contents:contents
    })
    await data1.save()
    res.redirect('/home')

});

app.get('/courseDetails/:courseName', async (req, res) => {
    try {
        const courseName = req.params.courseName;
        console.log(`Fetching details for course: ${courseName}`);
        const course = await CourseCollection.findOne({ courseName: courseName });
        const topics = course.topics
        const contents = course.contents
        const topiccontent = topics.map((topic,index) => ({
            topic:topic,
            content:contents[index]
        }))
        if (course) {
            res.render('courseDetails', { course , topiccontent});
        } else {
            res.status(404).send('Course not found');
        }
    } catch (err) {
        console.error('Error fetching course:', err);
        res.status(500).send('Internal Server Error');
    }
});