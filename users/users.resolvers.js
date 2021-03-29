import client from '../client';

export default {
  User: {
    //다른사람의 팔로워에 내이름이 있는 것을 탐색
    totalFollowing: ({ id }) => {
      return client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      });
    },
    totalFollowers: ({ id }) => {
      return client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
    },
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      console.log(id);
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user
        .findUnique({ where: { userName: loggedInUser.userName } })
        .following({
          where: {
            id,
          },
        });
      return exists.length !== 0;
    },
    photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),
  },
};
