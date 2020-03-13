/**
 * @file Operações sobre a tabela de estados
 * @module resolvers/estado
 * @author Josafá Santos
 */
export default {

  Query: {

    // restorna todos os estados
    estados: (parent, args, { models }) => models.Estado.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }),

    // restorna todos os estados com seus respectivos países
    // estadosWithPaises: (parent, args, { models }) => models.Estado.findAll({
    //   include: [
    //     { as: 'pais', model: models.Pais }
    //   ],
    //   attributes: { exclude: ['createdAt', 'updatedAt'] }
    // }),

    // busca estado pelo código
    estado: (parent, { id }, { models }) => models.Estado.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }),

    // busca estado, com país, pelo código
    // estadoWithPais: (parent, { id }, { models }) => models.Estado.findByPk(id, {
    //   include: [
    //     { as: 'pais', model: models.Pais }
    //   ],
    //   attributes: { exclude: ['createdAt', 'updatedAt'] }
    // })

  },

  Mutation: {

    // inserir novo estado
    createEstado: (parent, args, { models }) => models.Estado.create({
      nome: args.nome,
      sigla: args.sigla,
      paisId: args.paisId,
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    // atualizar estado
    updateEstado: async (parent, args, { models }) => {
      const result = await models.Estado.update({
        nome: args.nome,
        sigla: args.sigla,
        paisId: args.paisId,
        updatedAt: new Date(),
      }, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      return result[1]
    },

    // excluir um estado
    deleteEstado: (parent, { id }, { models }) => models.Estado.destroy({
      where: {
        id
      }
    })
  }
}
