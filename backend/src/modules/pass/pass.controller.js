const passService = require('./pass.service');
const asyncHandler = require('../../shared/utils/asyncHandler');

const createPass = asyncHandler(async (req, res) => {
  const result = await passService.createPass(req.user, req.body);
  res.status(201).json({ success: true, data: result });
});

const getMyPasses = asyncHandler(async (req, res) => {
  const passes = await passService.getMyPasses(req.user);
  res.json({ success: true, data: passes });
});

const getPassDetail = asyncHandler(async (req, res) => {
  const pass = await passService.getPassDetail(req.user, req.params.id);
  res.json({ success: true, data: pass });
});

const revokePass = asyncHandler(async (req, res) => {
  const pass = await passService.revokePass(req.user, req.params.id);
  res.json({ success: true, data: pass });
});

const validateQrToken = asyncHandler(async (req, res) => {
  const pass = await passService.validateQrToken(req.user, req.params.token);
  res.json({ success: true, data: pass });
});

const lookupRecurring = asyncHandler(async (req, res) => {
  const passes = await passService.lookupRecurringPasses(req.user.societyId, req.query);
  res.json({ success: true, data: passes });
});

module.exports = {
  createPass, getMyPasses, getPassDetail, revokePass, validateQrToken, lookupRecurring
};
