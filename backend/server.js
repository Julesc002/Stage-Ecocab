const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require('cors');
const port = 5000;

// Connexion à la DB 
connectDB();

const app = express();


// Middleware qui permet de traiter les données de la Request 
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(cors());

app.use("/post", require("./routes/post.routes"));
app.use("/travel", require("./routes/routeTravel"));
app.use("/user", require("./routes/routeUser"));


// Lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port " + port));