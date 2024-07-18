import {
  GraphQLSchema,
  IntrospectionQuery,
  buildClientSchema,
  printSchema,
} from 'graphql'
import axios, { AxiosResponse } from 'axios'
import { join } from 'path'
import { writeFile } from 'fs/promises'

import { query } from './introspection-query'

const body = { operationName: 'IntrospectionQuery', variables: {}, query }

import { MapperKind, mapSchema } from '@graphql-tools/utils'

const ACCESS_TOKEN = '----'
const SPACE_ID = '----'
const ENVIRONMENTS = 'master'
const HOST = 'graphql.contentful.com'

const init = async (): Promise<void> => {
  const { data } = await axios.post<AxiosResponse<IntrospectionQuery>>(
    /**
     * Using contentful as a backend to get the `IntrospectionQuery` response
     */
    `https://${HOST}/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENTS}?access_token=${ACCESS_TOKEN}`,
    body
  )

  const contentfulGqlSchema = buildClientSchema(data.data)

  const mappedContentfulGqlSchema = mapSchema(contentfulGqlSchema, {
    [MapperKind.OBJECT_TYPE]: (type) => {
      const fields = type.getFields()
      if (fields._id) {
        // ❌ delete the `_id` field ❌
        delete fields._id
      }
      return type
    },
  })

  await writeFile(
    join(__dirname, 'schema.gql'),
    printSchema(mappedContentfulGqlSchema)
  )
}

init()
