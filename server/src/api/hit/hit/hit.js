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
};
