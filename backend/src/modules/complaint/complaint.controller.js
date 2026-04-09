const complaintService = require('./complaint.service');

const create = async (req, res) => {
  try {
    const complaint = await complaintService.createComplaint({
      ...req.body,
      userId: req.user.id,
      flatId: req.user.flatId,
      societyId: req.user.societyId,
    });
    res.status(201).json({ success: true, data: complaint });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await complaintService.getComplaints({ userId: req.user.id });
    res.json({ success: true, data: complaints });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const complaints = await complaintService.getComplaints({ societyId: req.user.societyId });
    res.json({ success: true, data: complaints });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const close = async (req, res) => {
  try {
    const io = req.app.get('io');
    const complaint = await complaintService.closeComplaint(req.params.id, req.body.closingNote, io);
    res.json({ success: true, data: complaint });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { create, getMyComplaints, getAll, close };