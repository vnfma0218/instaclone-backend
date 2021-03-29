import { gql } from 'apollo-server-core';

export default gql`
  type UnFollowResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    unFollowUser(userName: String!): UnFollowResult
  }
`;
