/**
 * @title Operações sobre a tabela de secoes
 * @module src/resolvers/secao
 * @author Josafá Santos dos Reis
 */

import Secao from '../data/secao.js'

export default {

  Query: {

    /**
     * retorna todos os registros de seções
     */
    secoes: () => Secao.findAll(),

    /**
     * busca um registro de seção, dado o código
    */
    secao: (_, { id }) => Secao.findByPk(id)
  },

  Mutation: {

    /**
     * insere um novo registro de seção
     */
    createSecao: (_, args) => Secao.create(args),

    /**
     * atualiza um registro de seção, dado o id 
     */
    updateSecao: async (_, args) => Secao.update(args),

    /**
     * excluir um registro de seção, dado o id
     */
    deleteSecao: async (_, { id }) => Secao.destroy(id)
  }
}
