const { createRandomPckd } = require("../../../helpers");
const { isDuplicatePckd } = require("../../../helpers");

module.exports = {
  Mutation: {
    createPckd: async (_, args, ctx) => {
      // Extract db from context
      const { prisma } = ctx;

      // 1. Get Pckd String
      let pckd;
      // check if pckd is passed in, else throw error
      if (args.hasOwnProperty("pckd")) {
        pckd = args.pckd;

        // check if pckd is valid
        if (await isDuplicatePckd(prisma, pckd)) {
          throw new Error("Duplicate Pckd");
        }
      } else {
        pckd = await createRandomPckd(prisma);
      }

      // 2. Get Target
      const { target } = args;
      let data = {
        pckd,
        target,
      };

      // 3. Check if user is authenticated, else create anonymous record
      const userId = ctx.getUserId(ctx);
      if (userId) {
        data = { ...data, userId };
      }

      // 3. Create Pckd
      await prisma.pckd.create({
        data
      });

      return pckd;
    },
  },
};
