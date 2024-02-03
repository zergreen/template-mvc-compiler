const express = require('express');
const router = express.Router()
const { Endpoint } = require('../controller/endpoint');

// Route
router.post("/addData", new Endpoint().addDataEndpoint);
router.get("/getAlldata", new Endpoint().getAllDataEndpoint);
router.get("/deleteData/:id", new Endpoint().deleteDataEndpoint);
router.get("/report", new Endpoint().reportEndpoint);
// router.put("/editData", new Endpoint().editDataEndpoint);

router.get('/', (req, res) => {
    return res.render('../view/pages/home.ejs')
})

module.exports = router;