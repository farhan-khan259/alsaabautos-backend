const Unit = require('../Model/UnitModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createUnit = catchAsync(async (req, res, next) => {
  const newUnit = await Unit.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      unit: newUnit
    }
  });
});

exports.getAllUnits = catchAsync(async (req, res, next) => {
  const units = await Unit.find();
  res.status(200).json({
    status: 'success',
    results: units.length,
    data: {
      units
    }
  });
});

exports.getUnit = catchAsync(async (req, res, next) => {
  const unit = await Unit.findById(req.params.id);
  if (!unit) {
    return next(new AppError('No unit found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      unit
    }
  });
});

exports.updateUnit = catchAsync(async (req, res, next) => {
  const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!unit) {
    return next(new AppError('No unit found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      unit
    }
  });
});

exports.deleteUnit = catchAsync(async (req, res, next) => {
  const unit = await Unit.findByIdAndDelete(req.params.id);
  if (!unit) {
    return next(new AppError('No unit found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
