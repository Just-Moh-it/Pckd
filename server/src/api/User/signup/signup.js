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

      // Validate the password
      // 1. check if the password is at least 8 characters long
      if (args.password.length < 8)
        throw Error("The password must be at least 8 characters long");

      // 2. check if the password contains at least one number
      if (!args.password.match(/\d/))
        throw Error("The password must contain at least one number");
        

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
