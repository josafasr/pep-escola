/**
 * @file Operações sobre a tabela de estados civis
 * @module resolvers/estado-civil
 * @author Josafá Santos
 */
export default {

  Query: {

    /**
     * retorna todos os registros de estado civil
     */
    estadosCivil: (parent, args, { models }) => models.EstadoCivil.findAll(),

    /**
     * restorna um registro de estado civil pelo id
     */
    estadoCivil: (parent, { id }, { models }) => models.EstadoCivil.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de estado civil
     */
    createEstadoCivil: (parent, args, { models }) => models.EstadoCivil.create({
      nome: args.nome,
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    /**
     * atualiza um registro de estado civil, dado o id
     */
    updateEstadoCivil: (parent, args, { models }) => models.EstadoCivil.update({
      nome: args.nome,
      updatedAt: new Date(),
    }, {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    /**
     * exclui exclui um registro de estado civil, dado o id
     */
    deleteEstadoCivil: (parent, { id }, { models }) => models.EstadoCivil.destroy({
      where: {
        id
      }
    })
  }
}
