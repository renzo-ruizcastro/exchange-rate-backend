const { Router } = require('express');
const auditController = require('../controllers/auditController');

const router = Router();

router
  .route('/')
  .get(auditController.getAllAudits)
  .post(auditController.createAudit);
router.route('/:id').get(auditController.getAudit);

module.exports = router;
