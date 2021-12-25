module.exports = {
  Query: {
    getUserInfo: async (parent, args, ctx) => {
      // 1. Check if user is authenticated, else error
      const userId = ctx.getUserId(ctx);
      if (!userId) {
        throw new Error("Not authenticated");
      }

      // 2. Get user info
      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new Error("User not found");
      }

      // 3. Delete password
      delete user.password;

      // 3. Return user info
      return user;
    },
  },
};
