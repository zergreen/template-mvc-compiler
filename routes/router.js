const express = require('express');
const router = express.Router()
const { Endpoint } = require('../controller/endpoint');

// Route
router.post("/addData", new Endpoint().addDataEndpoint);
router.get("/getAlldata", new Endpoint().getAllDataEndpoint);
router.get("/deleteData/:id", new Endpoint().deleteDataEndpoint);
router.get("/report", new Endpoint().reportEndpoint);
// router.put("/editData", new Endpoint().editDataEndpoint);

// Route
router.get("/rooms", new Endpoint().getRoomEndpoint);
router.post("/reserveRoom", new Endpoint().reserveRoomEndpoint);
router.get("/games", new Endpoint().getGameEndpoint);
router.post("/reserveGame", new Endpoint().reserveGameEndpoint);
router.post("/cancelReservation", new Endpoint().cancelReservationEndpoint);

// router.get('/', (req, res) => {
//     return res.render('../view/pages/home.ejs')
// })

router.get('/', (req, res) => {
    res.render('index', { result: null, error: null }); // Render the EJS template with no initial data
  });

router.post('/', new Endpoint().arrayProcessEndpoint);
router.get('/results', new Endpoint().arrayResultEndpoint);

router.post('/delete-index/:index', new Endpoint().arrayDeleteIndexEndpoint);

module.exports = router;