const mongoose = require("mongoose");
const { DB_CONNECT } = require(".");

function connectToDb() {
    mongoose
        .connect(DB_CONNECT)
        .then(() => console.log("Connected to DB"))
        .catch((err) => console.log(err));
}

module.exports = connectToDb;
