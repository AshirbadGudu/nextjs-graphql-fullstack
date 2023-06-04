import { Resolvers } from "../../types";
import { CategoryResolvers } from "./category.resolvers";
import { BrandResolvers } from "./brand.resolvers";

export const resolvers: Resolvers = {
  Query: {
    ...CategoryResolvers.Query,
    ...BrandResolvers.Query,
  },
  Mutation: {
    ...CategoryResolvers.Mutation,
    ...BrandResolvers.Mutation,
  },
};
