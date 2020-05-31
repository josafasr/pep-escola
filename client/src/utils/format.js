/**
 * Funções para formatação
 * @module src/utils/format
 * @author Josafá Santos dos Reis
 */

export const toDatabaseDate = (datePtBr) => {
  if (!datePtBr) { return }
  const dateArray = datePtBr.split('/').reverse()
  const databaseDate = dateArray.join('-')
  return databaseDate
}

export const toPtBrDate = (databaseDate) => {
  if (!databaseDate) { return }
  const dateArray = databaseDate.split('-').reverse()
  const ptBrDate = dateArray.join('/')
  return ptBrDate
}