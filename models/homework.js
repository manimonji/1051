const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
    date: Date,
    description: String,
});

module.exports = mongoose.model("Homework", homeworkSchema);