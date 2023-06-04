import { createSchema, createYoga } from "graphql-yoga";
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schemas";
export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga<any>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/api/graphql",
});
