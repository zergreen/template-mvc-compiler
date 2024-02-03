//library express of node js
const express = require('express');
const server = express();
const routes = require("./routes/router");
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'view'))

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
server.use(helmet())
server.use(express.json());
server.use(routes);

// Server port listen in server port 3000
server.listen(port, function(err) {
    console.log(` [HOST] http://localhost:${port}`);
})