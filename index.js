const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postsRoute = require("./routes/posts")

const app = express();
const port = process.env.PORT || 1337;

require("dotenv").config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to Mongo Atlas"))
    .catch((err) => console.error(err));

//MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(port, () => {
    console.log("Backend server is running! in the port: ", port);
});

/* const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello Worldss!");
});

const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port); */

