const jwt = require("jsonwebtoken");

exports.getUserId = (ctx, throwErrors = true) => {
  const token = ctx.request.get("Authorization");
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  }

  if (throwErrors) throw Error("You need to be authenticated.");
  return null;
};
