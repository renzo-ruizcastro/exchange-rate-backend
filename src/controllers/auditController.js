const Audit = require('../models/auditModel');
const bcrypt = require('bcrypt');

exports.getAllAudits = async (req, res) => {
  try {
    const audits = await Audit.findAll();
    res.status(200).json({
      status: 'success',
      results: audits.length,
      data: {
        audits,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.getAudit = async (req, res) => {
  try {
    const audit = await Audit.findByPk(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        audit,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.createAudit = async (req, res) => {
  try {
    const { user_id, exchange_id, log } = req.body;
    const audit = await Audit.create({
      user_id,
      exchange_id,
      log,
    });
    res.status(201).json({
      status: 'success',
      data: {
        audit,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};
