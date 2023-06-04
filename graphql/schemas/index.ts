import { readGraphql } from "../helpers";

export const typeDefs = `
${readGraphql({ schema: "Brand" })}
${readGraphql({ schema: "Category" })}
${readGraphql({ schema: "Mail" })}
${readGraphql({ schema: "Query" })}
${readGraphql({ schema: "Mutation" })}
`;
