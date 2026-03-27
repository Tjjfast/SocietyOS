const service = require('./user.service');

const getProfile = async (req, res) => {
  try {
    const user = await service.getProfile(req.user.id);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await service.updateProfile(req.user.id, req.body);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getPending = async (req, res) => {
  try {
    const users = await service.getPendingUsers(req.user.societyId);
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const approve = async (req, res) => {
  try {
    const user = await service.approveUser(req.params.id);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const reject = async (req, res) => {
  try {
    const user = await service.rejectUser(req.params.id);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await service.getSocietyContacts(req.user.societyId);
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const saveFcmToken = async (req, res) => {
  try {
    await service.saveFcmToken(req.user.id, req.body.token);
    res.json({ success: true, message: 'FCM token saved' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { getProfile, updateProfile, getPending, approve, reject, getContacts, saveFcmToken };