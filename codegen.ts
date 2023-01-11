
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "schemas/index.gql",
  generates: {
    "types/index.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;
