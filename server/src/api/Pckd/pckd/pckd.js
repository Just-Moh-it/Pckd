module.exports = {
  pckd: {
    hits: (parent, args, ctx) => {
      const { prisma } = ctx;

      return prisma.hits.findMany({
        where: {
          pckdId: parent.id,
        },
      });
    },
    user: (parent, args, ctx) => {
      const { prisma } = ctx;

      return prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      });
    },
  },
};
