const jwt = require("jsonwebtoken");

exports.getUserId = (ctx) => {
  const token = ctx.request.get("Authorization");
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  }

  throw Error("You need to be authenticated.");
};
