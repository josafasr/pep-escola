/**
 * @file Operações sobre a tabela de cores de pele
 * @module resolvers/cor-pele
 * @author Josafá Santos
 */
export default {

  Query: {

    /**
     * restorna todos as cores de pele
     */
    coresPele: (parent, args, { models }) => models.CorPele.findAll(),

    /**
     * restorna uma cor de pele pelo id
     */
    corPele: (parent, { id }, { models }) => models.CorPele.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de cor de pele
     */
    createCorPele: (parent, args, { models }) => models.CorPele.create({
      nome: args.nome,
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    /**
     * atualiza um registro de cor de pele, dado o id
     */
    updateCorPele: (parent, args, { models }) => models.CorPele.update({
      nome: args.nome,
      updatedAt: new Date(),
    }, {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    /**
     * exclui exclui um registro de cor de pele, dado o id
     */
    deleteCorPele: (parent, { id }, { models }) => models.CorPele.destroy({
      where: {
        id
      }
    })
  }
}
