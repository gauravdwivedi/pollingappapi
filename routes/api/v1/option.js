const express = require('express');
const optionController = require('../../../controllers/optionController');
const router = express.Router();


router.post('/:id/add_vote', optionController.add_vote);
router.delete('/:id/delete', optionController.deleteOption);

module.exports = router;