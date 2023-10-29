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
                    homeworks.forEach((homework) => {
                        const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
                        let dateString = `${homework.day} ${persianMonths[homework.month]}`;
                        if (!homeworksObject[dateString]) {
                            homeworksObject[dateString] = [];
                        }
                        homeworksObject[dateString].push(homework.description);
                    });
                    resolve(homeworksObject);
                })
            })
            return await homeworksPromise;
        }
    }
});

module.exports = mongoose.model("Homework", homeworkSchema);
