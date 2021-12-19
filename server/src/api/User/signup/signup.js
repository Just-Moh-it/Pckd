const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    signup: async (parent, args, ctx) => {
      // check if the email and username is unique
      const exists = await ctx.prisma.user.findUnique({
        where: { email: args.email },
      });

      if (exists) throw Error("The email already exists, try different ones");

      // hash the password, save the user in db
      const hashedPw = await bcrypt.hash(args.password, 10);

      // generate a jsonwebtoken using the userid as payload
      const { password, ...user } = await ctx.prisma.user.create({
        data: { ...args, password: hashedPw },
      });

      // generate jsonwebtoken using userid as payload
      const payload = { userId: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return {
        token,
        user,
      };
    },
  },
};
