const express = require('express');

const router = express.Router();
const questionController = require('../../../controllers/questionController');
const optionController = require('../../../controllers/optionController');

router.post('/create', questionController.createQuestion);
router.post('/:id/options/create', optionController.createOption);
router.delete('/:id/delete', questionController.deleteQuestion);
router.get('/:id', questionController.getQuestion);
router.get('/', questionController.getAllQuestions);

module.exports = router;