const { createRandomPckd } = require("../../../helpers");
const { isDuplicatePckd } = require("../../../helpers");

module.exports = {
  Mutation: {
    createPckd: async (_, args, ctx) => {
      // Extract db from context
      const { prisma } = ctx;

      // Get args
      const { title, target, enableTracking } = args;

      // Get user Id
      const userId = ctx.getUserId(ctx, (throwErrors = false));

      // 1. Get Pckd String
      let pckd;
      // check if pckd is passed in, else throw error
      if (args.hasOwnProperty("pckd") && args.pckd) {
        pckd = args.pckd;

        // check if pckd is valid
        if (await isDuplicatePckd(prisma, pckd)) {
          throw new Error(
            "The custom backhalf already exists, try a different one."
          );
        }
      } else {
        pckd = await createRandomPckd(prisma);
      }

      // 2. Select data
      let data = {
        pckd,
        target,
        userId,
        title: userId ? title : null,
        enableTracking: userId ? enableTracking : false,
      };

      // 3. Create Pckd
      await prisma.pckd.create({
        data,
      });

      return pckd;
    },
  },
};
