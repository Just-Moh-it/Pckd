module.exports = {
  hit: {
    pckd: (parent, args, ctx) => {
      const { prisma } = ctx;

      return prisma.hits.findMany({
        where: {
          pckdId: parent.pckdId,
        },
      });
    },
    timezone: (parent, args, ctx) => {
      return {
        name: parent.timezoneName,
        offset: parent.timezoneOffset,
        id: parent.timezoneId,
        abbreviation: parent.timezoneAbbreviation,
      };
    },
    location: (parent, args, ctx) => {
      return {
        name: parent.locationName,
        city: parent.locationCity,
        postal: parent.locationPostal,
        country: {
          name: parent.locationCountryName,
          code: parent.locationCountryCode,
        },
        continent: {
          name: parent.locationContinentName,
          code: parent.locationContinentCode,
        },
      };
    },
    browser: (parent, args, ctx) => {
      return {
        name: parent.browserName,
        version: parent.browserVersion,
      };
    },
    os: (parent, args, ctx) => {
      return {
        name: parent.OSName,
        version: parent.OSVersion,
      };
    },
  },
  Query: {
    hit: async (_, { id: hitId }, ctx) => {
      const { prisma } = ctx;
      // 1. Check if user is authenticated, else error
      const userId = ctx.getUserId(ctx);
      if (!userId) {
        throw new Error("Not authenticated");
      }

      // TODO: Combine into one query

      // 2. Get the hit and the parent pckd
      const hit = await prisma.hits.findUnique({
        where: {
          id: hitId,
        },
      });
      const pckd = await prisma.pckd.findUnique({
        where: {
          id: hit.pckdId,
        },
        select: {
          userId: true,
        },
      });

      // Check if hit belongs to user
      // If not, throw error
      if (pckd.userId !== userId) {
        throw new Error("Not authorized");
      }

      return hit;
    },
  },
};
