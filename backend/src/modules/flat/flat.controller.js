const flatService = require('./flat.service');
const asyncHandler = require('../../shared/utils/asyncHandler');

const listFlats = asyncHandler(async (req, res) => {
  const flats = await flatService.listFlats(req.user.societyId);
  res.json({ success: true, data: flats });
});

const createFlat = asyncHandler(async (req, res) => {
  const flat = await flatService.createFlat(req.user.societyId, req.body);
  res.status(201).json({ success: true, data: flat });
});

const updateFlat = asyncHandler(async (req, res) => {
  const flat = await flatService.updateFlat(req.user.societyId, req.params.id, req.body);
  res.json({ success: true, data: flat });
});

const deleteFlat = asyncHandler(async (req, res) => {
  await flatService.deleteFlat(req.user.societyId, req.params.id);
  res.json({ success: true, message: 'Flat deleted' });
});

module.exports = { listFlats, createFlat, updateFlat, deleteFlat };
