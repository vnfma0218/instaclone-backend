import { gql } from 'apollo-server-core';

export default gql`
  type seeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type Query {
    seeFollowers(userName: String!, page: Int!): seeFollowersResult!
  }
`;
