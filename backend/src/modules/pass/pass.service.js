const crypto = require('crypto');
const prisma = require('../../shared/config/prisma');

const createPass = async (user, data) => {
  const { type, visitorName, visitorType, visitorPhone, notes, validFrom, validUntil, allowedDays, windowStart, windowEnd, expiresAt } = data;

  if (type === 'ONE_TIME') {
    const qrToken = crypto.randomUUID();
    return await prisma.pass.create({
      data: {
        type, visitorName, visitorType, visitorPhone, notes,
        qrToken,
        expiresAt: expiresAt || validUntil || new Date(Date.now() + 24 * 60 * 60 * 1000),
        status: 'ACTIVE',
        residentId: user.id,
        flatId: user.flatId,
        societyId: user.societyId
      }
    });
  } else if (type === 'RECURRING') {
    return await prisma.pass.create({
      data: {
        type, visitorName, visitorType, visitorPhone, notes,
        allowedDays: allowedDays || [],
        windowStart, windowEnd,
        validFrom: validFrom ? new Date(validFrom) : new Date(),
        validUntil: validUntil ? new Date(validUntil) : null,
        status: 'ACTIVE',
        residentId: user.id,
        flatId: user.flatId,
        societyId: user.societyId
      }
    });
  } else {
    throw new Error('Invalid pass type');
  }
};

const getMyPasses = async (user) => {
  return await prisma.pass.findMany({
    where: { residentId: user.id, societyId: user.societyId },
    include: { flat: { select: { number: true } } },
    orderBy: { createdAt: 'desc' }
  });
};

const getPassDetail = async (user, passId) => {
  const pass = await prisma.pass.findUnique({
    where: { id: passId },
    include: {
      flat: { select: { number: true } },
      resident: { select: { name: true, phone: true } }
    }
  });
  if (!pass || pass.residentId !== user.id) {
    throw new Error('Pass not found');
  }
  return pass;
};

const revokePass = async (user, passId) => {
  const pass = await prisma.pass.findUnique({ where: { id: passId } });
  if (!pass || pass.residentId !== user.id) throw new Error('Pass not found');

  return await prisma.pass.update({
    where: { id: passId },
    data: { status: 'REVOKED' }
  });
};

const validateQrToken = async (guardUser, token) => {
  const pass = await prisma.pass.findUnique({
    where: { qrToken: token },
    include: {
      resident: { select: { name: true, phone: true } },
      flat: { select: { number: true } }
    }
  });

  if (!pass) throw new Error('Pass Invalid: Not Found');
  if (pass.societyId !== guardUser.societyId) throw new Error('Pass Invalid: Wrong Society');
  if (pass.status !== 'ACTIVE') throw new Error(`Pass Invalid: ${pass.status}`);
  if (pass.expiresAt && pass.expiresAt < new Date()) throw new Error('Pass Invalid: Expired');

  return pass;
};

const lookupRecurringPasses = async (societyId, { query, flatId }) => {
  const where = {
    societyId,
    type: 'RECURRING',
    status: 'ACTIVE',
  };

  if (flatId) where.flatId = flatId;

  if (query) {
    where.visitorName = { contains: query, mode: 'insensitive' };
  }

  const passes = await prisma.pass.findMany({
    where,
    include: {
      flat: { select: { number: true } },
      resident: { select: { name: true, phone: true } }
    },
    orderBy: { visitorName: 'asc' },
    take: 20
  });

  // Filter by current day/time window
  const now = new Date();
  const currentDay = now.getDay(); // 0=Sun, 1=Mon ... 6=Sat
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return passes.map(pass => {
    const isScheduledDay = pass.allowedDays.length === 0 || pass.allowedDays.includes(currentDay);
    const isInWindow = (!pass.windowStart || currentTime >= pass.windowStart) &&
                       (!pass.windowEnd || currentTime <= pass.windowEnd);
    const isValid = (!pass.validFrom || now >= pass.validFrom) &&
                    (!pass.validUntil || now <= pass.validUntil);

    return {
      ...pass,
      isCurrentlyAllowed: isScheduledDay && isInWindow && isValid,
      scheduleMatch: { isScheduledDay, isInWindow, isValid }
    };
  });
};

module.exports = {
  createPass,
  getMyPasses,
  getPassDetail,
  revokePass,
  validateQrToken,
  lookupRecurringPasses
};
