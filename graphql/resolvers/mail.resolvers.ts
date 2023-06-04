import { CONFIG, transporter } from "configs";
import { Resolvers } from "types";

export const MailResolvers: Resolvers = {
  Mutation: {
    sendEmail: async (_, { html, to }) => {
      try {
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
              message: `Some of the recipients were rejected`,
              code: "MAIL_REJECTED",
            },
          };
        return {
          __typename: "SuccessResponse",
          message: `Mail sent to ${to}`,
        };
      } catch (error) {
        console.log(error);
        return {
          __typename: "FailureResponse",
          error: {
            message: `Some of the recipients were rejected`,
            code: "MAIL_REJECTED",
          },
        };
      }
    },
  },
};
