import { GraphQLError } from "graphql";
import { Resolvers } from "types";

const resolvers: Resolvers = {
  Query: {
    cart: (_, { id }) => {
      return {
        id,
        totalItems: 0,
      };
    },
  },
  Mutation: {
    sendEmail: (_, { html, to }) => {
      if (!html?.length)
        throw new GraphQLError(`Need proper body to send email`);
      if (!to?.length)
        throw new GraphQLError(`Can not send email to invalid recipients`);
      return `Mail sent to ${to}`;
    },
  },
};

export default resolvers;
