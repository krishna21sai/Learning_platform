const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Cred")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("mongodb not connected");
    });


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    topics: {
        type: [String],
        required: true,
    },
    contents: {
        type: [String],
        required: true,
    },
});

const UserCollection = mongoose.model("collection1", userSchema);
const CourseCollection = mongoose.model("collection2", courseSchema);

module.exports = { UserCollection, CourseCollection };
