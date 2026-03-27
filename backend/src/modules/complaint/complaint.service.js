const prisma = require('../../shared/config/prisma');

const VALID_TRANSITIONS = {
  CREATED: ['ASSIGNED'],
  ASSIGNED: ['IN_PROGRESS'],
  IN_PROGRESS: ['USER_CONFIRMED'],
  USER_CONFIRMED: ['CLOSED'],
};

const createComplaint = async ({ title, description, category, userId, flatId }) => {
  return await prisma.complaint.create({
    data: { title, description, category, userId, flatId, status: 'CREATED' }
  });
};

const getComplaints = async (filters = {}) => {
  return await prisma.complaint.findMany({
    where: filters,
    include: { user: { select: { name: true, email: true } }, flat: true },
    orderBy: { createdAt: 'desc' }
  });
};

const updateComplaintStatus = async (id, newStatus, io) => {
  const complaint = await prisma.complaint.findUnique({ where: { id } });
  if (!complaint) throw new Error('Complaint not found');

  const allowed = VALID_TRANSITIONS[complaint.status];
  if (!allowed?.includes(newStatus)) {
    throw new Error(`Invalid transition: ${complaint.status} → ${newStatus}`);
  }

  const updated = await prisma.complaint.update({
    where: { id },
    data: { status: newStatus, updatedAt: new Date() }
  });

  if (io) {
    io.to(updated.userId).emit('complaint:updated', {
      message: `Complaint status updated to ${newStatus}`,
      complaint: updated
    });
  }

  return updated;
};

const assignComplaint = async (id, assignedTo) => {
  return await prisma.complaint.update({
    where: { id },
    data: { assignedTo, status: 'ASSIGNED' }
  });
};

module.exports = { createComplaint, getComplaints, updateComplaintStatus, assignComplaint };