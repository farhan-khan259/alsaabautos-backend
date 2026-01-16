const Unit = require('../Model/UnitModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const path = require('path');

exports.createUnit = catchAsync(async (req, res, next) => {
  const unitData = { ...req.body };

  // Parse investors if it's a string (from FormData)
  if (typeof unitData.investors === 'string') {
    unitData.investors = JSON.parse(unitData.investors);
  }

  // Handle uploaded files
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    console.log('Files uploaded - count:', req.files.length);
    const images = req.files.filter(f => f.fieldname === 'images').map(f => {
      // Extract relative path from uploads folder and convert to forward slashes
      const uploadsIndex = f.path.indexOf('uploads');
      if (uploadsIndex === -1) {
        console.error('uploads folder not found in path:', f.path);
        return f.path.replace(/\\/g, '/');
      }
      const relativePath = f.path.substring(uploadsIndex).replace(/\\/g, '/');
      const imagePath = `/${relativePath}`;
      console.log('Processed image path:', imagePath, 'Original:', f.path);
      return imagePath;
    });
    const invoices = req.files.filter(f => f.fieldname === 'invoices').map(f => {
      // Extract relative path from uploads folder and convert to forward slashes
      const uploadsIndex = f.path.indexOf('uploads');
      if (uploadsIndex === -1) {
        console.error('uploads folder not found in path:', f.path);
        return f.path.replace(/\\/g, '/');
      }
      const relativePath = f.path.substring(uploadsIndex).replace(/\\/g, '/');
      return `/${relativePath}`;
    });

    console.log('Images to save:', images);
    console.log('Invoices to save:', invoices);
    if (images.length > 0) {
      unitData.images = images;
    }
    if (invoices.length > 0) {
      unitData.invoices = invoices;
    }
  } else {
    console.log('No files received. req.files:', req.files);
  }

  console.log('Final unitData:', unitData);
  const newUnit = await Unit.create(unitData);
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
  const updateData = { ...req.body };

  // Parse investors if it's a string (from FormData)
  if (typeof updateData.investors === 'string') {
    updateData.investors = JSON.parse(updateData.investors);
  }

  // Handle uploaded files
  if (req.files && req.files.length > 0) {
    const images = req.files.filter(f => f.fieldname === 'images').map(f => {
      // Extract relative path from uploads folder and convert to forward slashes
      const uploadsIndex = f.path.indexOf('uploads');
      const relativePath = f.path.substring(uploadsIndex).replace(/\\/g, '/');
      return `/${relativePath}`;
    });
    const invoices = req.files.filter(f => f.fieldname === 'invoices').map(f => {
      // Extract relative path from uploads folder and convert to forward slashes
      const uploadsIndex = f.path.indexOf('uploads');
      const relativePath = f.path.substring(uploadsIndex).replace(/\\/g, '/');
      return `/${relativePath}`;
    });

    if (images.length > 0) {
      updateData.images = images;
    }
    if (invoices.length > 0) {
      updateData.invoices = invoices;
    }
  }

  const unit = await Unit.findByIdAndUpdate(req.params.id, updateData, {
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
