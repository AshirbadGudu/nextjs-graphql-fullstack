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
        return {
          __typename: "FailureResponse",
          error: {
            message: `Need proper body to send email`,
            code: "INVALID_EMAIL_BODY",
          },
        };

      if (!to?.length)
        return {
          __typename: "FailureResponse",
          error: {
            message: `Provided email address is not a valid`,
            code: "INVALID_RECIPIENT_EMAIL",
          },
        };
      return {
        __typename: "SuccessResponse",
        message: `Mail sent to ${to}`,
      };
    },
  },
};

export default resolvers;
