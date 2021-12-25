const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    resetPassword: async (parent, args, ctx) => {
      // 1. Check if user is authenticated, else error
      const userId = ctx.getUserId(ctx);
      if (!userId) {
        throw new Error("Not authenticated");
      }

      // 2. check the user is registered
      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw Error("The user id does not exist.");

      // 3. check if the password matches
      const isMatch = await bcrypt.compare(args.oldPassword, user.password);
      if (!isMatch) throw Error("The old password is incorrect. Try again.");

      // 4. hash the new password
      const password = await bcrypt.hash(args.newPassword, 10);

      // 5. update the password
      await ctx.prisma.user.update({
        where: { id: userId },
        data: { password },
      });

      // 6. send back authpayload -> token, user
      const payload = { userId: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      // 7. do not send back the password
      delete user.password;

      return {
        token,
        user,
      };
    },
  },
};
