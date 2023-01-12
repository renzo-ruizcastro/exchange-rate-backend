const { Router } = require('express');
const exchangeController = require('../controllers/exchangeController');
const authController = require('../controllers/authController');

const router = Router();

router
  .route('/')
  .get(authController.protect, exchangeController.getAllExchanges)
  .post(
    authController.protect,
    authController.restrictsTo(1),
    exchangeController.createExchange
  );
router
  .route('/:id')
  .get(authController.protect, exchangeController.getExchange)
  .patch(
    authController.protect,
    authController.restrictsTo(1),
    exchangeController.updateExchange
  )
  .delete(
    authController.protect,
    authController.restrictsTo(1),
    exchangeController.deleteExchange
  );

module.exports = router;
