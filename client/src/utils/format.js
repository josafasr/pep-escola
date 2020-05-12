/**
 * Funções para formatações
 * @author Josafá Santos dos Reis
 */

export const toDatabaseDate = (datePtBr) => {
  const dateArray = datePtBr.split('/').reverse()
  const databaseDate = dateArray.join('-')
  return databaseDate
}
