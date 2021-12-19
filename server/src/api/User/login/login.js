const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    login: async (parent, args, ctx) => {
      // 1. check the user is registered
      const user = await ctx.prisma.user.findUnique({
        where: { email: args.email },
      });
      if (!user) throw Error("The email is not registered to an account.");

      // 2. check if the password matches
      const isMatch = await bcrypt.compare(args.password, user.password);
      if (!isMatch) throw Error("The password does not match. Try again.");

      // 3. send back authpayload -> token, user
      const payload = { userId: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      // 4. do not send back the password
      delete user.password;

      return {
        token,
        user,
      };
    },
  },
};
