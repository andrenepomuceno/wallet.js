
console.log("Starting server...");

const express = require('express');
const cors = require("cors");
var bodyParser = require('body-parser');

const connectDB = require('./config/db');
const events = require('./routes/api/events');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api/events', events);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));