import { readFileSync } from "fs";
import { createYoga, createSchema } from "graphql-yoga";
import { join } from "path";
import { Resolvers } from "../../types";

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const typeDefs = readFileSync(join(process.cwd(), "schemas/index.gql"), {
  encoding: "utf-8",
});

const resolvers: Resolvers = {
  Query: {
    cart: (_, { id }) => {
      return {
        id,
        totalItems: 0,
      };
    },
  },
};

export default createYoga<any>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/api/graphql",
});
