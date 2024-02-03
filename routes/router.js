const express = require('express');
const router = express.Router()
const { Endpoint } = require('../controller/endpoint');

router.get('/', (req, res) => {
    res.render('index', { result: null, error: null }); // Render the EJS template with no initial data
  });

router.post('/', new Endpoint().arrayProcessEndpoint);
router.get('/results', new Endpoint().arrayResultEndpoint);

router.post('/delete-index/:index', new Endpoint().arrayDeleteIndexEndpoint);

module.exports = router;