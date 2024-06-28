const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
        try {
                mongoose.connect(process.env.MONGODB_URL).then(() => {
                        console.log("connected successfully");
                }).catch((err) => console.log(`connected failed ${err}`));

        } catch (error) {
                console.log("connect failed");
                process.exit(1);
        }
}
