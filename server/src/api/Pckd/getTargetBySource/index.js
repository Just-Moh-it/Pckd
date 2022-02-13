const isp = require("../../../utils/isp");
var parser = require("ua-parser-js");

module.exports = {
  Mutation: {
    getTargetByPckd: async (_, { pckd }, ctx) => {
      // Destructure prisma from context
      const { prisma } = ctx;

      // 1. Get Pckd by taget
      const data = await prisma.pckd.findUnique({
        where: {
          pckd,
        },
        select: {
          target: true,
          id: true,
          hitCount: true,
          enableTracking: true,
        },
      });

      // 2. Return target, else throw error
      if (!data || !data.target) {
        throw new Error("Target not found");
      }

      // 3. Insert hit inside table
      // only if link was created by authenticated user
      // else ignore
      if (data.enableTracking) {
        handleHitInsert(ctx, data.id);
      }

      // Increses the hit count
      await prisma.pckd.update({
        where: {
          id: data.id,
        },
        data: {
          hitCount: data.hitCount + 1,
        },
      });

      return data.target;
    },
  },
};

const handleHitInsert = async (ctx, id) => {
  const { prisma } = ctx;

  try {
    const testMode = process.env.NODE_ENV === "development" ? true : false;

    // Remote address
    const remoteAddr = ctx.request.connection.remoteAddress;

    // 3.1 Get ip of request, and check if it exists
    const ipRaw = testMode
      ? "122.177.222.233"
      : remoteAddr?.contains("127.0.0.1") || remoteAddr?.contains("::")
      ? ctx.request.headers["x-forwarded-for"] ||
        ctx.request.headers["x-real-ip"]
      : remoteAddr;
    // seperate ipv4 and ipv6
    // check if rawIp contains ':' characters
    const ip = ipRaw.includes(":") ? ipRaw.split(":")[3] : ipRaw;

    // Get the browser from headers
    const userAgent = ctx.request.headers["user-agent"];

    const parsedUserAgent = parser(userAgent);
    // Extract browser-name frmo user-agent
    const {
      browser: { name: browserName, version: browserVersion },
      os: { name: OSName, version: OSVersion },
    } = parsedUserAgent;

    // If isp exists, get details from api
    let ipInfo;
    // 3.1.1 Get isp info
    try {
      // const ispInfo = await isp(ip);
      if (ip) {
        const rawIspInfo = await isp(ip);

        ipInfo = {
          ip: ip,
          type: rawIspInfo.type,
          isp: rawIspInfo.isp,
          timezoneName: rawIspInfo.timezone.name,
          timezoneOffset: rawIspInfo.timezone.offset,
          timezoneId: rawIspInfo.timezone.id,
          timezoneAbbreviation: rawIspInfo.timezone.abbreviation,
          locationName: rawIspInfo.location.name,
          locationCity: rawIspInfo.location.city,
          locationPostal: rawIspInfo.location.postal,
          locationCountryName: rawIspInfo.location.country.name,
          locationCountryCode: rawIspInfo.location.country.code,
          locationContinentName: rawIspInfo.location.continent.name,
          locationContinentCode: rawIspInfo.location.continent.code,
        };
      } else ipInfo = {};
    } catch (error) {
      console.error("IP address error: ", error);
    }
    // 3.1.3 Insert isp info into database
    await prisma.hits.create({
      data: {
        pckdId: id,
        ...ipInfo,
        browserName: browserName,
        browserVersion: browserVersion,
        OSName: OSName,
        OSVersion: OSVersion,
      },
    });
  } catch (err) {
    console.error("An ip address resolving error occured:", err);
  }
};
