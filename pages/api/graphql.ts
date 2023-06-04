import { readFileSync } from "fs";
import { createYoga, createSchema } from "graphql-yoga";
import { join } from "path";
import { resolvers } from "../../graphql/resolvers";
export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const typeDefs = readFileSync(
  join(process.cwd(), "graphql/schemas/index.gql"),
  {
    encoding: "utf-8",
  }
);

export default createYoga<any>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/api/graphql",
});
