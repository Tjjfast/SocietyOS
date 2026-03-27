const create = async (req, res) => {
  try {
    const io = req.app.get('io');
    const entry = await service.createEntryRequest({
      ...req.body,
      userId: req.user.id
    }, io);
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};