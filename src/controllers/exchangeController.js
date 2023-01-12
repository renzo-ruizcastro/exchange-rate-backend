const Exchange = require('../models/exchangeModel');

exports.getAllExchanges = async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
    const where = {};
    if (query.from) where.from = query.from;
    if (query.to) where.to = query.to;

    const exchanges = await Exchange.findAll({ where });
    res.status(200).json({
      status: 'success',
      results: exchanges.length,
      data: {
        exchanges,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.getExchange = async (req, res) => {
  try {
    const exchange = await Exchange.findByPk(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        exchange,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.createExchange = async (req, res) => {
  try {
    const { currency_a, currency_b, rate_a_to_b, rate_b_to_a } = req.body;
    if (currency_a === currency_b)
      throw new Error('Cannot set exchange rate over the same currency');
    const foundSame = await Exchange.findAll({
      where: {
        from: currency_a,
        to: currency_b,
      },
    });
    const foundCombined = await Exchange.findAll({
      where: {
        from: currency_b,
        to: currency_a,
      },
    });
    if (foundSame.length || foundCombined.length)
      throw new Error('Register already exists');
    const newExchange = await Exchange.create({
      from: currency_a,
      to: currency_b,
      rate: rate_a_to_b,
    });
    const newExchangeCombined = await Exchange.create({
      from: currency_b,
      to: currency_a,
      rate: rate_b_to_a,
    });
    res.status(201).json({
      status: 'success',
      data: {
        exchanges: [newExchange, newExchangeCombined],
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.updateExchange = async (req, res) => {
  try {
    const exchange = await Exchange.findByPk(req.params.id);
    if (!exchange) throw new Error('No exchange found with that ID');
    const updated = await Exchange.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated[0]) throw new Error('Something went wrong');
    const updatedExchange = await Exchange.findByPk(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        exchange: updatedExchange,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.deleteExchange = async (req, res) => {
  try {
    await Exchange.destroy({
      where: { id: req.params.id },
    });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};
