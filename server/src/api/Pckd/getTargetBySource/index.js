const isp = require("../../../utils/isp");

module.exports = {
  Mutation: {
    getTargetByPckd: async (_, { pckd }, ctx) => {
      // Destructure prisma from context
      const { prisma } = ctx;

      // 1. Get Pckd by taget
      const { target, id, userId } = await prisma.pckd.findUnique({
        where: {
          pckd,
        },
        select: {
          target: true,
          id: true,
          userId: true
        },
      });

      // 2. Return target, else throw error
      if (!target) {
        throw new Error("Target not found");
      }

      // 3. Insert hit inside table
      // only if link was created by authenticated user
      // else ignore
      if (userId) {
        handleHitInsert(ctx, id);
      }

      return target;
    },
  },
};

const handleHitInsert = async (ctx, id) => {
  const { prisma } = ctx;

  try {
    // 3.1 Get ip of request, and check if it exists
    const ipRaw = ctx.request.connection.remoteAddress;
    // seperate ipv4 and ipv6
    // check if rawIp contains ':' characters
    const ip = ipRaw.includes(":") ? ipRaw.split(":")[3] : ipRaw;

    if (ip) {
      // If isp exists, get details from api

      // 3.1.1 Get isp info
      try {
        // const ispInfo = await isp(ip);
        const ispInfo = await isp("122.177.172.148");

        // 3.1.3 Insert isp info into database
        await prisma.hits.create({
          data: {
            pckdId: id,
            ip: ip,
            type: ispInfo.type,
            isp: ispInfo.isp,
            timezoneName: ispInfo.timezone.name,
            timezoneOffset: ispInfo.timezone.offset,
            timezoneId: ispInfo.timezone.id,
            timezoneAbbreviation: ispInfo.timezone.abbreviation,
            locationName: ispInfo.location.name,
            locationCity: ispInfo.location.city,
            locationPostal: ispInfo.location.postal,
            locationCountryName: ispInfo.location.country.name,
            locationCountryCode: ispInfo.location.country.code,
            locationContinentName: ispInfo.location.continent.name,
            locationContinentCode: ispInfo.location.continent.code,
          },
        });
      } catch (error) {
        console.error("IP address error: ", error);
      }
    }
  } catch (err) {
    console.error("An ip address resolving error occured:", err);
  }
};
