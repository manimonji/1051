const express = require("express");
const router = express.Router();

router.route("/")
    .get((req, res) => {
        res.send("تکالیف");
    })
    .post((req, res) => {
        res.send(req.body.description);
    });

router.get("/new", (req, res) => {
    res.render("homeworks/new");
});

module.exports = router;