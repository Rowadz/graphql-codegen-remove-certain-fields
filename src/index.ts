import type { CodegenConfig } from '@graphql-codegen/cli'
import { join } from 'path'

const config: CodegenConfig = {
  overwrite: true,
  schema: join(__dirname, './schema.gql'),
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
}

export default config
