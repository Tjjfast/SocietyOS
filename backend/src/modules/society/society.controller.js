const societyService = require('./society.service');
const asyncHandler = require('../../shared/utils/asyncHandler');

const listSocieties = asyncHandler(async (req, res) => {
  const societies = await societyService.listSocieties();
  res.json({ success: true, data: societies });
});

const getSociety = asyncHandler(async (req, res) => {
  const society = await societyService.getSociety(req.user.societyId);
  res.json({ success: true, data: society });
});

const updateSociety = asyncHandler(async (req, res) => {
  const society = await societyService.updateSociety(req.user.societyId, req.body);
  res.json({ success: true, data: society });
});

module.exports = { listSocieties, getSociety, updateSociety };
