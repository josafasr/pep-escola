/**
 * @file Operações sobre a tabela de escolaridades
 * @module resolvers/escolaridade
 * @author Josafá Santos
 */
export default {

  Query: {

    /**
     * retorna todos os registros de escolaridade
     */
    escolaridades: (parent, args, { models }) => models.Escolaridade.findAll(),

    /**
     * restorna um registro de escolaridade pelo id
     */
    escolaridade: (parent, { id }, { models }) => models.Escolaridade.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de escolaridade
     */
    createEscolaridade: (parent, args, { models }) => models.Escolaridade.create({
      nome: args.nome,
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    /**
     * atualiza um registro de escolaridade, dado o id
     */
    updateEscolaridade: (parent, args, { models }) => models.Escolaridade.update({
      nome: args.nome,
      updatedAt: new Date(),
    }, {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    /**
     * exclui exclui um registro de escolaridade, dado o id
     */
    deleteEscolaridade: (parent, { id }, { models }) => models.Escolaridade.destroy({
      where: {
        id
      }
    })
  }
}
