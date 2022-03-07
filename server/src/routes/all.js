const handleHitInsert = require("../utils/hitInsert");

module.exports = async (req, res, prisma) => {
  // Check if test mode
  const testMode = process.env.NODE_ENV === "development" && true;

  // Get first subpath from url
  const subPath = req.url.split("/")[1];

  // Get request ip address from the connection or from header
  const remoteAddr = testMode
    ? "122.177.155.228"
    : req.connection.remoteAddress ||
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"];

  // Get user agent from header
  const userAgent = req.headers["user-agent"];

  // Check if subpath is a valid pckd
  try {
    const data = await prisma.pckd.findUnique({
      where: {
        pckd: subPath,
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
      return res.status(404).send("Target not found");
    }

    // 3. Insert hit inside table
    // only if link was created by authenticated user
    // else ignore
    if (data.enableTracking) {
      handleHitInsert({ prisma, pckdId: data.id, userAgent, ip: remoteAddr });
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

    // Redirect to target
    res.redirect(data.target);
  } catch (e) {
    console.error(e);
  }
};
