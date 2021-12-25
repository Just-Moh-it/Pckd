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
    hitCount: async ({ id }, args, { prisma }) => {
      // Count total hits where hit id is give
      const hitCount = await prisma.hits.aggregate({
        where: {
          pckdId: id,
        },
        _count: {
          pckdId: true,
        },
      });

      // Return hit count
      return hitCount._count.pckdId;
    },
  },
};
