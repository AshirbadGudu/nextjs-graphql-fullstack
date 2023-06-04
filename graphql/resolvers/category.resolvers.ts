import { prisma } from "configs";
import { Resolvers } from "../../types";

export const CategoryResolvers: Resolvers = {
  Query: {
    categories: async (_, { filter, limit, offset, sort }) => {
      const categories = (await prisma.category.findMany({
        take: limit || undefined,
        skip: offset || undefined,
        orderBy: {
          [sort?.field || "createdAt"]: sort?.order || "desc",
        },
        where: {
          [filter?.field || "name"]: {
            contains: filter?.value || "",
            mode: "insensitive",
          },
        },
      })) as any;
      return categories;
    },
    category: async (_, { slug }) => {
      const category = (await prisma.category.findUnique({
        where: { slug },
      })) as any;
      return category;
    },
  },
  Mutation: {
    createCategory: async (_, { input }) => {
      const newCategory = (await prisma.category.create({
        data: input as any,
      })) as any;
      return newCategory;
    },
    updateCategory: async (_, { id, input }) => {
      const updatedCategory = (await prisma.category.update({
        where: { id },
        data: input as any,
      })) as any;
      return updatedCategory;
    },
    deleteCategory: async (_, { id }) => {
      const deletedCategory = (await prisma.category.delete({
        where: { id },
      })) as any;
      return deletedCategory;
    },
  },
};
