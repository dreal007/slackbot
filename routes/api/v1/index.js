const express = require('express');
const router = express.Router();

const Controller = require('../../../controllers/userResponse');
const { checkSchema } = require('express-validator');
const { deleteResponseSchema, getAllResponseSchema,getResponseSchema } = require('../../../middlewares/validators/response')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Slack bot APIs Version 1.0' });
});

router.post('/slackbot', function(req, res, next) {
  console.log(req.body)
});

router.delete('/:id', checkSchema(deleteResponseSchema), Controller.deleteResponse);
router.get('/all-response', checkSchema(getAllResponseSchema), Controller.getAllResponses);
router.get('/:id', checkSchema(getResponseSchema), Controller.getAllResponses);

module.exports = router;
