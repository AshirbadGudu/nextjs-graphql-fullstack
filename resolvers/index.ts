import { CONFIG, transporter } from "configs";
import { Resolvers } from "types";

const resolvers: Resolvers = {
  Query: { cart: (_, { id }) => ({ id, totalItems: 0 }) },
  Mutation: {
    sendEmail: async (_, { html, to }) => {
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
      const { rejected, response } = await transporter.sendMail({
        from: `${CONFIG.MAIL_ADDRESS}`,
        to,
        subject: "Subject: ",
        html,
      });
      if (rejected?.length)
        return {
          __typename: "FailureResponse",
          error: {
            message: `Mail error: ${response}`,
            code: "INTERNAL_SERVER_ERROR",
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
