import { readFileSync } from "fs";
import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const typeDefs = readFileSync(join(process.cwd(), "schemas/index.gql"), {
  encoding: "utf-8",
});

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: createSchema({
    typeDefs,
    resolvers: {
      Query: {
        greet: () => "Hello",
      },
    },
  }),
  graphqlEndpoint: "/api/graphql",
});
