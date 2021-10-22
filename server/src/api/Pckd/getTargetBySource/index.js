module.exports = {
  Query: {
    getTargetByPckd: async (_, { pckd }, { prisma }) => {
      const { target } = await prisma.pckd.findUnique({
        where: {
          pckd,
        },
        select: {
          target: true,
        },
      });

      return target
    },
  },
};
