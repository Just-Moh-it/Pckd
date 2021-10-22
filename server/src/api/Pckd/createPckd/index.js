const { createRandomPckd } = require("../../../helpers");
const { isDuplicatePckd } = require("../../../helpers");

module.exports = {
  Mutation: {
    createPckd: async (_, args, { prisma }) => {
      let pckd;
      // check if pckd is passed
      if (args.hasOwnProperty("pckd")) {
        pckd = args.pckd;

        // check if pckd is valid
        if (await isDuplicatePckd(prisma, pckd))
          throw new Error("Duplicate Pckd");
      } else {
        pckd = await createRandomPckd(prisma);
        console.log(pckd);
      }

      const { target } = args;

      await prisma.pckd.create({
        data: {
          pckd,
          target,
        },
      });
      // await prisma.pckd.create(data);
      return pckd;
    },
  },
};
