const { IpregistryClient } = require("@ipregistry/client");

const client = new IpregistryClient(process.env.IPREGISTRY_API_KEY);

const isp = async (ip) => {
  let returner;
  try {
    const { data } = await client.lookup(ip);

    returner = {
      type: data?.company?.type,
      isp: data?.connection?.organization,
      timezone: {
        name: data?.time_zone?.name,
        offset: data?.time_zone?.offset,
        id: data?.time_zone?.id,
        abbreviation: data?.time_zone?.abbreviation,
      },
      location: {
        name: data?.location?.region?.name,
        city: data?.location?.city,
        postal: data?.location?.postal,
        country: {
          name: data?.location?.country?.name,
          code: data?.location?.country?.code,
        },
        continent: {
          code: data?.location?.continent?.code,
          name: data?.location?.continent?.name,
        },
      },
    };

    return returner;
  } catch (err) {
    console.error(err);
  }
};

module.exports = isp;

