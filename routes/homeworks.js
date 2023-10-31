const express = require("express");
const router = express.Router();

const Homework = require("../models/homework");

router.route("/")
    .get(async (req, res) => {
        res.render("homeworks/index", {homeworks: await Homework.getHomeworks(), cssFiles: ["/css/homeworks/index.css"]});
    })
    .post(async (req, res) => {
        const homework = new Homework(req.body);
        try {
            const newHomework = await homework.save();
            console.log(newHomework);
            res.redirect("/homeworks");
        } catch(err) {
            console.log(err);
        }
    });

router.get("/new", (req, res) => {
    res.render("homeworks/new");
});

module.exports = router;