import client from '../../client';

export default {
  Query: {
    serachUsers: async (_, { keyword }) => {
      return client.user.findMany({
        where: {
          userName: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
    },
  },
};
