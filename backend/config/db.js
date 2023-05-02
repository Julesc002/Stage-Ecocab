const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);

        mongoose.connect("mongodb+srv://ecocab:ecocabpassword@ecocab.72lwa6n.mongodb.net/test").then(() => {
            console.log('MongoDB connect');
        }).catch((err) => {
            console.error("MongoDb connection error : " + err);
        })

    } catch (err) {
        console.log(err);
        process.exit();
    }
}


module.exports = connectDB;