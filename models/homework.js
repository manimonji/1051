const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },

},
{
    statics: {
        async getHomeworks() {
            let homeworksObject = {};
            let homeworksPromise = new Promise((resolve) => {
                this.find().sort({ month: 1, day: 1 }).then(homeworks => {
                    homeworks.forEach(({ month, day, description }) => {
                        const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
                        const currentMonth = Number(new Date().toLocaleString("fa-IR", {month: "numeric"}).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
                        const today = Number(new Date().toLocaleString("fa-IR", {day: "numeric"}).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
                        const isTomorrow = month + 1 == currentMonth && day - today == 1;
                        let dateString = `${isTomorrow ? "فردا،" : ""} ${day} ${persianMonths[month]}`;
                        if (!homeworksObject[dateString]) {
                            homeworksObject[dateString] = [];
                        }
                        homeworksObject[dateString].push(description);
                    });
                    resolve(homeworksObject);
                })
            })
            return await homeworksPromise;
        }
    }
});

module.exports = mongoose.model("Homework", homeworkSchema);
