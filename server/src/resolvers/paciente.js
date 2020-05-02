/**
 * @file Operações sobre a tabela de pacientes
 * @module resolvers/paciente
 * @author Josafá Santos
 */
export default {

  Query: {

    /**
     * retorna todos os registros de paciente
     */
    pacientes: (parent, args, { models }) => models.Paciente.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }),

    /**
     * restorna um registro de paciente pelo id
     */
    paciente: (parent, { id }, { models }) => models.Paciente.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

  },

  Mutation: {

    /**
     * cria um novo registro de paciente
     */
    createPaciente: async (parent, args, { models }) => {
      const paciente = await models.Paciente.create(args)
      return paciente
    },

    /**
     * atualiza um registro de paciente, dado o id
     */
    updatePaciente: async (parent, args, { models }) => {
      const result = await models.Paciente.update(args, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      const paciente = result[1]
      return paciente
    },

    /**
     * atualiza um registro de paciente, dado o id
     */
    deletePaciente: (parent, { id }, { models }) => models.Paciente.destroy({
      where: {
        id
      }
    })
  }
}
