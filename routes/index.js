const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.redirect("/homeworks");
});

module.exports = router;