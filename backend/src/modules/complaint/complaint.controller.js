const create = async (req, res) => {
  try {
    const imageUrl = req.file?.path || null;
    const complaint = await service.createComplaint({
      ...req.body,
      userId: req.user.id,
      imageUrl
    });
    res.status(201).json({ success: true, data: complaint });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
const getAll = async (req, res) => {
  try {
    const filters = {};
    if (req.user.role === 'RESIDENT') filters.userId = req.user.id;
    if (req.user.role === 'SERVICE') filters.assignedTo = req.user.id;
    const complaints = await service.getComplaints(filters);
    res.json({ success: true, data: complaints });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const io = req.app.get('io');
    const complaint = await service.updateComplaintStatus(
      req.params.id,
      req.body.status,
      io
    );
    res.json({ success: true, data: complaint });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const assign = async (req, res) => {
  try {
    const complaint = await service.assignComplaint(req.params.id, req.body.assignedTo);
    res.json({ success: true, data: complaint });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { create, getAll, updateStatus, assign };