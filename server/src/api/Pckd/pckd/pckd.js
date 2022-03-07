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
    byCountryGraph: async (parent, _, { prisma }) => {
      const res = await prisma.hits.groupBy({
        by: ["locationCountryCode", "locationCountryName"],
        _count: {
          id: true,
        },
        where: {
          pckdId: parent.id,
        },
      });

      return res.map((i) => ({
        country: { code: i.locationCountryCode, name: i.locationCountryName },
        count: i._count.id,
      }));
    },
  },
};
