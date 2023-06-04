import { Brand, Category, Resolvers } from "../../types";

// Placeholder data
const categoriesData: Category[] = [
  {
    id: "1",
    name: "Category 1",
    slug: "category-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isFeatured: true,
    isPublished: false,
  },
];

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

export const resolvers: Resolvers = {
  Query: {
    categories: () => {
      return categoriesData;
    },
    brands: () => {
      return brandsData;
    },
    category: (_, { slug }) => {
      return categoriesData.find((category) => category.slug === slug) || null;
    },
    brand: (_, { slug }) => {
      return brandsData.find((brand) => brand.slug === slug) || null;
    },
  },
  Mutation: {
    createCategory: (_, { input }) => {
      // Logic to create a new category
      const newCategory = {
        id: generateNewId(), // Generate a new ID
        createdAt: getCurrentDateTime(), // Get the current date and time
        updatedAt: getCurrentDateTime(),
        ...input,
      };
      categoriesData.push(newCategory);
      return newCategory;
    },
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
    updateCategory: (_, { id, input }) => {
      const categoryIndex = categoriesData.findIndex(
        (category) => category.id === id
      );
      if (categoryIndex !== -1) {
        const updatedCategory = {
          ...categoriesData[categoryIndex],
          updatedAt: getCurrentDateTime(),
          ...input,
        };
        categoriesData[categoryIndex] = updatedCategory;
        return updatedCategory;
      }
      return null;
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
    deleteCategory: (_, { id }) => {
      const categoryIndex = categoriesData.findIndex(
        (category) => category.id === id
      );
      if (categoryIndex !== -1) {
        const deletedCategory = categoriesData.splice(categoryIndex, 1)[0];
        return deletedCategory;
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

// Helper function to generate a new unique ID (you can implement your own logic)
function generateNewId() {
  return `${Date.now()}`;
}

// Helper function to get the current date and time
function getCurrentDateTime() {
  return new Date().toISOString();
}
