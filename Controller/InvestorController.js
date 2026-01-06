const Investor = require('../Model/InvestorModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createInvestor = catchAsync(async (req, res, next) => {
  const newInvestor = await Investor.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      investor: newInvestor
    }
  });
});

exports.getAllInvestors = catchAsync(async (req, res, next) => {
  const investors = await Investor.find();
  res.status(200).json({
    status: 'success',
    results: investors.length,
    data: {
      investors
    }
  });
});

exports.getInvestor = catchAsync(async (req, res, next) => {
  const investor = await Investor.findById(req.params.id);
  if (!investor) {
    return next(new AppError('No investor found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      investor
    }
  });
});

exports.updateInvestor = catchAsync(async (req, res, next) => {
  const investor = await Investor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!investor) {
    return next(new AppError('No investor found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      investor
    }
  });
});

exports.deleteInvestor = catchAsync(async (req, res, next) => {
  const investor = await Investor.findByIdAndDelete(req.params.id);
  if (!investor) {
    return next(new AppError('No investor found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
