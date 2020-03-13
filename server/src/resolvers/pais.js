/**
 * @file Operações sobre a tabela de países
 * @module resolvers/pais
 * @author Josafá Santos
 */
export default {

  Query: {

    // restorna todos os países
    paises: (parent, args, { models }) => models.Pais.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }),
    // busca país pelo código
    pais: (parent, { id }, { models }) => models.Pais.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

  },

  Mutation: {

    // inserir novo país
    createPais: (parent, args, { models }) => models.Pais.create({
      nome: args.nome,
      sigla: args.sigla,
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    // atualizar país
    updatePais: async (parent, args, { models }) => {
      const result = await models.Pais.update({
        nome: args.nome,
        sigla: args.sigla,
        updatedAt: new Date(),
      }, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      return result[1]
    },

    // excluir um país
    deletePais: (parent, { id }, { models }) => models.Pais.destroy({
      where: {
        id
      }
    })
  }
}
