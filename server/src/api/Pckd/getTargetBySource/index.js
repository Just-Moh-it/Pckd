const handleHitInsert = require("../../../utils/hitInsert");

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
        initiateHitInsert({ prisma, id: data.id, ctx });
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

const initiateHitInsert = ({ prisma, id: pckdId, ctx }) => {
  try {
    const testMode = process.env.NODE_ENV === "development";

    // Remote address
    const remoteAddr = ctx.request.connection.remoteAddress;

    // 3.1 Get ip of request, and check if it exists
    const ipRaw = testMode
      ? "122.177.222.233"
      : remoteAddr?.includes("127.0.0.1") || remoteAddr?.includes("::")
      ? ctx.request.headers["x-forwarded-for"] ||
        ctx.request.headers["x-real-ip"]
      : remoteAddr;
    // seperate ipv4 and ipv6
    // check if rawIp includes ':' characters
    const ip = ipRaw.includes(":") ? ipRaw.split(":")[3] : ipRaw;

    // Get the browser from headers
    const userAgent = ctx.request.headers["user-agent"];

    handleHitInsert({ ip, userAgent, prisma, pckdId });
  } catch (error) {
    console.error("An ip address resolving error occured:", error);
  }
};
