/**
 * @file Operações sobre a tabela de consultas
 * @module src/resolvers/consulta
 * @author Josafá Santos dos Reis
 */

import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de consulta
     */
    consultas: (parent, args, { models }) => models.Consulta.findAll({
      include: [
        {
          association: 'paciente',
          include: [
            {
              association: 'pessoa',
              attributes: ['nome']
            }
          ]
        }, {
          association: 'recordatorioAlimentar',
          attributes: ['quantidade'],
          include: [
            {
              association: 'alimento',
              attributes: ['nome']
            }, {
              association: 'tipoRefeicao',
              attributes: ['nome']
            }
          ]
        }, {
          association: 'queixas',
          attributes: ['nome']
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }),

    /**
     * restorna um registro de consulta pelo id
     */
    consulta: (parent, { id }, { models }) => models.Consulta.findByPk(id, {
      include: [
        {
          association: 'paciente',
          include: [
            {
              association: 'pessoa',
              attributes: ['nome']
            }
          ]
        }, {
          association: 'recordatorioAlimentar',
          attributes: ['quantidade'],
          include: [
            {
              association: 'alimento',
              attributes: ['nome']
            }, {
              association: 'tipoRefeicao',
              attributes: ['nome']
            }
          ]
        }, {
          association: 'queixas',
          attributes: ['nome']
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

  },

  Mutation: {

    /**
     * cria um novo registro de consulta
     */
    createConsulta: async (parent, { recordatorioAlimentar, queixas, ...otherArgs }, { models }) => {
      try {
        const consulta = await models.Consulta.create({ ...otherArgs })

        if (recordatorioAlimentar) {
          await consulta.addRecordatorioAlimentar(recordatorioAlimentar)
        }

        if (queixas) {
          await consulta.addQueixas(queixas)
        }
        return {
          ok: true,
          consulta
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    /**
     * atualiza um registro de consulta, dado o id
     */
    updateConsulta: async (parent, { id, recordatorioAlimentar, queixas, ...otherArgs }, { models }) => {
      try {
        const consulta = await models.Consulta.findByPk(id)
        if ({ ...otherArgs }) {
          await consulta.update({ ...otherArgs }, {
            // where: { id },
            returning: true,
            plain: true
          })
        }

        if (recordatorioAlimentar) {
          consulta.addRecordatorioAlimentar(recordatorioAlimentar)
        }

        if (queixas) {
          consulta.addQueixas(queixas)
        }
        return {
          ok: true,
          consulta
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    /**
     * exclui um registro de consulta, dado o id
     */
    deleteConsulta: (parent, { id }, { models }) => models.Consulta.destroy({
      where: {
        id
      }
    })
  }
}
