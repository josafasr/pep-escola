/**
 * @file Descritores GraphQL para mensagens de erro
 * @module schemas/error
 * @author Josafá Santos
 */
export default `
  type Error {
    path: String!
    message: String
  }
`