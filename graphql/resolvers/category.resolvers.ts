import { Category, Resolvers } from "../../types";

// Write category queries and mutations
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

export const CategoryResolvers: Resolvers = {
  Query: {
    categories: () => {
      return categoriesData;
    },
    category: (_, { slug }) => {
      return categoriesData.find((category) => category.slug === slug) || null;
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
