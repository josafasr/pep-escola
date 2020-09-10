/**
 * @title Operações sobre a tabela de tempo de estudo
 * @module resolvers/tempo-estudo
 * @author Josafá Santos dos Reis
 */
export default {

  Query: {

    /**
     * retorna todos os registros de tempo de estudo
     */
    temposEstudo: (parent, args, { models }) => models.TempoEstudo.findAll(),

    /**
     * restorna um registro de tempo de estudo pelo id
     */
    tempoEstudo: (parent, { id }, { models }) => models.TempoEstudo.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de tempo de estudo
     */
    createTempoEstudo: (parent, args, { models }) => models.TempoEstudo.create(args),

    /**
     * atualiza um registro de tempo de estudo, dado o id
     */
    updateTempoEstudo: (parent, args, { models }) => models.TempoEstudo.update(args, {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    /**
     * exclui exclui um registro de tempo de estudo, dado o id
     */
    deleteTempoEstudo: (parent, { id }, { models }) => models.TempoEstudo.destroy({
      where: {
        id
      }
    })
  }
}
