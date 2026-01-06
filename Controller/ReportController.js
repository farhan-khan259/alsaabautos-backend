const Report = require('../Model/ReportModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createReport = catchAsync(async (req, res, next) => {
  const newReport = await Report.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      report: newReport
    }
  });
});

exports.getAllReports = catchAsync(async (req, res, next) => {
  const reports = await Report.find();
  res.status(200).json({
    status: 'success',
    results: reports.length,
    data: {
      reports
    }
  });
});

exports.getReport = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    return next(new AppError('No report found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      report
    }
  });
});

exports.updateReport = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!report) {
    return next(new AppError('No report found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      report
    }
  });
});

exports.deleteReport = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndDelete(req.params.id);
  if (!report) {
    return next(new AppError('No report found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
