require("dotenv").config()
const express = require('express')
const path = require('path')
const cors = require("cors");
const PORT = process.env.PORT || 3092
const PORT_BACKEND = process.env.PORT_BACKEND || 5092
const DIST_FOLDER = path.resolve(__dirname, '..', 'dist')

const app = express();
const appBackend = express();
app.use(express.static(DIST_FOLDER));

appBackend.use(cors());
appBackend.use('/api', require('./route/route.js'));
// Use This Port For Front End
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
// Use This Port For Back End
appBackend.listen(PORT_BACKEND, () => console.log(`Listening on http://localhost:${PORT_BACKEND}`));