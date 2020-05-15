/**
 * @file Operações sobre a tabela de pacientes
 * @module src/resolvers/paciente
 * @author Josafá Santos dos Reis
 */

import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de paciente
     */
    pacientes: (parent, args, { models }) => models.Paciente.findAll({
      include: [
        {
          association: 'pessoa',
          attributes: ['id', 'nome']
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }),

    /**
     * restorna um registro de paciente pelo id
     */
    paciente: (parent, { id }, { models }) => models.Paciente.findByPk(id, {
      include: [
        {
          association: 'pessoa',
          attributes: ['id', 'nome']
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

  },

  Mutation: {

    /**
     * cria um novo registro de paciente
     */
    createPaciente: async (parent, { especialidades, ...otherArgs }, { models }) => {
      try {
        const paciente = await models.Paciente.create({ ...otherArgs })

        if (especialidades) {
          paciente.addEspecialidades(especialidades)
        }
        return {
          ok: true,
          paciente
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    /**
     * atualiza um registro de paciente, dado o id
     */
    updatePaciente: async (parent, { id, especialidades, ...otherArgs }, { models }) => {
      try {
        const paciente = await models.Paciente.findByPk(id)
        if ({ ...otherArgs }) {
          await paciente.update({ ...otherArgs }, {
            // where: { id },
            returning: true,
            plain: true
          })
        }

        if (especialidades) {
          paciente.addEspecialidades(especialidades)
        }
        return {
          ok: true,
          paciente
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
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
