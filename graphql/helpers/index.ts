import { readFileSync } from "fs";
import { join } from "path";
// Helper function to generate a new unique ID (you can implement your own logic)
export function generateNewId() {
  return `${Date.now()}`;
}

// Helper function to get the current date and time
export function getCurrentDateTime() {
  return new Date().toISOString();
}

export function readGraphql({ schema }: { schema: String }) {
  return readFileSync(join(process.cwd(), `graphql/schemas/${schema}.gql`), {
    encoding: "utf-8",
  });
}
