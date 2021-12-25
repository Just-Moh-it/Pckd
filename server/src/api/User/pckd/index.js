module.exports = {
  Query: {
    getAllPckds: async (_, args, ctx) => {
      // 1. Check if user is authenticated, else error
      const userId = ctx.getUserId(ctx);
      if (!userId) {
        throw new Error("Not authenticated");
      }

      // 2. Get all pckds
      const { prisma } = ctx;
      const pckds = await prisma.pckd.findMany({
        where: {
          userId,
        },
      });

      // 3. Return pckds
      return pckds;
    },
    getPckdInfo: async (_, args, ctx) => {
      // 1. Check if user is authenticated, else error
      const userId = ctx.getUserId(ctx);
      if (!userId) {
        throw new Error("Not authenticated");
      }

      // 2. Get pckd info
      const { prisma } = ctx;
      const pckd = await prisma.pckd.findUnique({
        where: {
          id: args.id,
          // add userId to ensure user owns pckd in the future
          // Using AND operator gives error on optional field
          // Todo: fix this
        },
      });

      // Temporary but inefficient fix
      if (pckd.userId !== userId) {
        throw new Error("Not authenticated to view this pckd's details");
      }

      // 3. Return pckd info
      return pckd;
    },
  }
};
