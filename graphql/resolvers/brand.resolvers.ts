import { Brand, Resolvers } from "../../types";
import { generateNewId, getCurrentDateTime } from "../helpers";

const brandsData: Brand[] = [
  {
    id: "1",
    name: "Brand 1",
    slug: "brand-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isFeatured: true,
    isPublished: false,
  },
];

export const BrandResolvers: Resolvers = {
  Query: {
    brands: () => {
      return brandsData;
    },
    brand: (_, { slug }) => {
      return brandsData.find((brand) => brand.slug === slug) || null;
    },
  },
  Mutation: {
    createBrand: (_, { input }) => {
      // Logic to create a new brand
      const newBrand = {
        id: generateNewId(),
        createdAt: getCurrentDateTime(),
        updatedAt: getCurrentDateTime(),
        ...input,
      };
      brandsData.push(newBrand);
      return newBrand;
    },

    updateBrand: (_, { id, input }) => {
      const brandIndex = brandsData.findIndex((brand) => brand.id === id);
      if (brandIndex !== -1) {
        const updatedBrand = {
          ...brandsData[brandIndex],
          updatedAt: getCurrentDateTime(),
          ...input,
        };
        brandsData[brandIndex] = updatedBrand;
        return updatedBrand;
      }
      return null;
    },

    deleteBrand: (_, { id }) => {
      const brandIndex = brandsData.findIndex((brand) => brand.id === id);
      if (brandIndex !== -1) {
        const deletedBrand = brandsData.splice(brandIndex, 1)[0];
        return deletedBrand;
      }
      return null;
    },
  },
};
