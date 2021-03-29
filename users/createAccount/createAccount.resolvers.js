import bcrypt from 'bcryptjs';
import client from '../../client';

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        //check if username or email are already on DB'
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                userName,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error('This userName/email is already taken');
        }
        //hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        //save and return the user
        await client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: 'Cant create account //' + error.message,
        };
      }
    },
  },
};
