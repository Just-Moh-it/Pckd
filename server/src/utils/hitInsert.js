const isp = require("./isp");
var parser = require("ua-parser-js");

module.exports = async ({ ip, userAgent, pckdId, prisma }) => {
  try {
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
        const rawIspInfo = await isp(ip.split(" ")[0]);

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
        pckdId,
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
