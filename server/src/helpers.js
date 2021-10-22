const { customAlphabet } = require("nanoid");

const generateId = (size = 7) => {
  // Generates alphanum random id
  return customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz@", size)();
};

const isDuplicatePckd = async (prisma, pckd) => {
  // check for duplicate column prisma
  const column = await prisma.pckd.count({
    where: {
      pckd: pckd,
    },
  });
  if (column > 0) {
    return true;
  }
  return false;
};

const createRandomPckd = async (prisma, size = 7) => {
  // Create a random pckd that isn't already taken
  let pckd = generateId(size);
  while (await isDuplicatePckd(prisma, pckd)) {
    pckd = generateId(size);
  }
  return pckd;
};

module.exports = {
  generateId,
  isDuplicatePckd,
  createRandomPckd,
};
