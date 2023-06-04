import { prisma } from "configs";
import { Resolvers } from "../../types";

export const BrandResolvers: Resolvers = {
  Query: {
    brands: async () => {
      const brands = (await prisma.brand.findMany()) as any;
      return brands;
    },
    brand: async (_, { slug }) => {
      const brand = (await prisma.brand.findUnique({
        where: { slug },
      })) as any;
      return brand;
    },
  },
  Mutation: {
    createBrand: async (_, { input }) => {
      const newBrand = (await prisma.brand.create({
        data: input as any,
      })) as any;
      return newBrand;
    },

    updateBrand: async (_, { id, input }) => {
      const updatedBrand = (await prisma.brand.update({
        where: { id },
        data: input as any,
      })) as any;
      return updatedBrand;
    },
    deleteBrand: async (_, { id }) => {
      const deletedBrand = (await prisma.brand.delete({
        where: { id },
      })) as any;
      return deletedBrand;
    },
  },
};
