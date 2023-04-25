const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        
        mongoose.connect(process.env.MONGO_URI).then(() => {
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