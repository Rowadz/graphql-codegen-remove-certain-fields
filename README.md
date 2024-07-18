# graphql codegen remove certain fields

This is an example on how to remove certain fields from the generated [codegen](https://the-guild.dev/graphql/codegen) typescript types.

To achieve this:

- We fetch the json representation of the schema with an [IntrospectionQuery](https://graphql.org/learn/introspection/) query
- Then we pass that to [buildclientschema](https://graphql-js.org/api/function/buildclientschema/) to create a [GraphQLSchema](https://graphql-js.org/api/class/GraphQLSchema).
- We map the schema to remove the unwanted fields using [mapschema](https://the-guild.dev/graphql/tools/docs/api/modules/utils_src#mapschema) from [@graphql/tools](https://the-guild.dev/graphql/tools).
- Then we can simply save the mapped schema as a string in a `.gql` file, and this is the file we pass to [codegen](https://the-guild.dev/graphql/codegen) to generate what we need.

# How to run the example in this repo

### Clone and install dependencies

```bash
$ git clone git@github.com:Rowadz/graphql-codegen-remove-certain-fields.git
$ cd graphql-codegen-remove-certain-fields
$ npm i
```

### Setup a backend to send the [IntrospectionQuery](https://graphql.org/learn/introspection/)

Inside [index.ts](./src/index.ts) I'm assuming the backend is [Contentful](https://www.contentful.com/), and there you can put your token and space/env IDs.

### NPM scripts

Run the below command to fetch the schema and map it to remove the required `_id` field before generating the TypeScript types.

```bash
$ npm run generate
```

> [!TIP] > [fetch-schema.ts](./src/fetch-schema.ts) will be executed before the above command automatically when you run it, and that what fetches the schema and map it.

The code is pretty simple and it is just a POC on how to do this.
