const { Router } = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.updateUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
