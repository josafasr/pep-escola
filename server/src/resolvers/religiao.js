/**
 * @description Operações sobre a tabela de religiões
 * @module src/resolvers/religiao
 * @author Josafá Santos dos Reis
 */

import ReligiaoRepository from '../data/religiao'

export default {

  Query: {

    /**
     * retorna todos os registros de religião
     */
    religioes: (parent, args, { models }) => models.Religiao.findAll(),

    /**
     * restorna um registro de religião pelo id
     */
    religiao: (parent, { id }, { models }) => models.Religiao.findByPk(id),

    /**
     * Busca profissoes pelo inicio do nome
     * @returns array de profissoes
     */
     religioesByText: async (_, { text }) => await ReligiaoRepository.findByText(text)
  },

  Mutation: {

    /**
     * cria um novo registro de religião
     */
     createReligiao: async (_, args ) => await ReligiaoRepository.create(args),

    /**
     * atualiza um registro de religião, dado o id
     */
    updateReligiao: (parent, args, { models }) => models.Religiao.update({
      nome: args.nome,
      updatedAt: new Date(),
    }, {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => {
      return result[1]
    }),

    /**
     * exclui exclui um registro de religião, dado o id
     */
    deleteReligiao: (parent, { id }, { models }) => models.Religiao.destroy({
      where: {
        id
      }
    })
  }
}
