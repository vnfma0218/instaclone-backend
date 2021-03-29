import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import client from '../../client';

export default {
  Mutation: {
    login: async (_, { userName, password }) => {
      //find user with args.username
      const user = await client.user.findFirst({ where: { userName } });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      //check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      console.log(passwordOk);
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Incorrect Password',
        };
      }

      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
      //issue a token and send it to the user
    },
  },
};
