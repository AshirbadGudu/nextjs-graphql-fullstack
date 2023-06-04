# Nextjs GraphQL Fullstack

## Setup `GraphQL` Server with `Nextjs`

### Install required dependencies for `GraphQL` API

```sh
yarn add graphql graphql-yoga
```

### Create a file named `graphql.ts` inside the `pages/api` directory

```sh
cd pages/api && touch graphql.ts
```

### Import `createYoga` & `createSchema` from `graphql-yoga` package

```ts
import { createYoga, createSchema } from "graphql-yoga";
```

### export the `createYoga` instance from the file with `schema` and `graphqlEndpoint`

```ts
export default createYoga<any>({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: "/api/graphql",
});
```

## Setup the `GraphQL` in client side

### Install the required dependencies for client side

```sh
yarn add @apollo/client
```

### Open the `_app.tsx` file and create new `ApolloClient`

```ts
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});
```

### Now change the return statement of `_app.tsx` file

```ts
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
```
