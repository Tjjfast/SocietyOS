const prisma = require('../../shared/config/prisma');

const createComplaint = async ({ title, description, category, userId, flatId, societyId }) => {
  return await prisma.complaint.create({
    data: { title, description, category, userId, flatId, societyId, status: 'OPEN' }
  });
};

const getComplaints = async (filters = {}) => {
  return await prisma.complaint.findMany({
    where: filters,
    include: { user: { select: { name: true, email: true } }, flat: true },
    orderBy: { createdAt: 'desc' }
  });
};

const closeComplaint = async (id, closingNote, io) => {
  const complaint = await prisma.complaint.findUnique({ where: { id } });
  if (!complaint) throw new Error('Complaint not found');

  const updated = await prisma.complaint.update({
    where: { id },
    data: { status: 'CLOSED', closingNote, updatedAt: new Date() }
  });

  if (io) {
    io.to(updated.userId).emit('complaint:closed', {
      message: `Your complaint "${updated.title}" has been closed`,
      complaint: updated
    });
  }

  return updated;
};

module.exports = { createComplaint, getComplaints, closeComplaint };