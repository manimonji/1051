const express = require("express");
const router = express.Router();

const Homework = require("../models/homework");

router.get("/", async (req, res) => {
    const homeworks = {};
    (await Homework.find({})).forEach((homework) => {
        if (!homeworks[homework.date]) {
            homeworks[homework.date] = []
        }
        homeworks[homework.date].push(homework.description);
    });
    res.render("homeworks/index", {homeworks: homeworks});
});

module.exports = router;