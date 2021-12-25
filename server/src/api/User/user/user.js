module.exports = {
  User: {
    pckds: async (parent, args, { prisma }) => {
      const pckds = await prisma.pckd.findMany({
        where: {
          userId: parent.id,
        },
      });
      return pckds;
    },
  },
};
