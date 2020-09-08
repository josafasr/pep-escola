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
    consultas: async (parent, _, { models }) => {
      const consultas = await models.Consulta.findAll({
        include: [
          {
            association: 'paciente',
            include: [
              {
                association: 'pessoa',
                attributes: ['id', 'nome']
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
            association: 'queixaPrincipal',
            attributes: ['id', 'nome']
          }, {
            association: 'queixas',
            attributes: ['id', 'nome']
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      return consultas
    },

    /**
     * restorna um registro de consulta pelo id
     */
    consulta: async (parent, { id }, { models }) => {
      const consulta = await models.Consulta.findByPk(id, {
        include: [
          {
            association: 'paciente',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
                association: 'pessoa',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                  association: 'contato',
                  attributes: { exclude: ['createdAt', 'updatedAt'] }
                }, {
                  association: 'enderecos',
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                  include: [{
                    association: 'tipoLogradouro',
                    attributes: ['id', 'nome']
                  }, {
                    association: 'cidade',
                    attributes: ['id', 'nome']
                  }]
                }]
              }, {
                association: 'unidadeSaude',
                attributes: ['id', 'nome']
              }, {
                association: 'naturalidade',
                attributes: ['id', 'nome']
              }, {
                association: 'estadoCivil',
                attributes: ['id', 'nome']
              }, {
                association: 'religiao',
                attributes: ['id', 'nome']
              }, {
                association: 'corPele',
                attributes: ['id', 'nome']
              }, {
                association: 'escolaridade',
                attributes: ['id', 'nome']
              }, {
                association: 'profissao',
                attributes: ['id', 'nome']
              }, {
                association: 'situacaoProfissional',
                attributes: ['id', 'nome']
              }, {
                association: 'especialidades',
                attributes: ['id', 'nome']
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
            association: 'queixaPrincipal',
            attributes: ['id', 'nome']
          }, {
            association: 'queixas',
            attributes: ['id', 'nome'],
            include: {
              association: 'tipoQueixa',
              attributes: ['id', 'nome']
            }
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      return consulta
    },

    consultasByPaciente: async (parent, { pacienteId }, { models }) => {
      const consultas = await models.Consulta.findAll({
        include: [
          {
            association: 'queixas',
            attributes: ['id', 'nome']
          }
        ],
        where: { pacienteId }
      })
      return consultas
    },

  },

  Mutation: {

    /**
     * cria um novo registro de consulta
     */
    createConsulta: async (parent, { queixas, ...ohterArgs }, { sequelize, models }) => {
      try {
        const result = await sequelize.transaction(async (tx) => {
          const consulta = await models.Consulta.create({ ...ohterArgs }, {
            include: [
              { association: 'recordatorioAlimentar' }
              /* [{"quantidade": x, "tipoRefeicaoId": y, "alimentoId": z}] */
            ]
          })
          if (queixas) {
            await consulta.addQueixas(queixas)
          }
          return consulta  // para 'result' receber 'consulta'

          /* if (recordatorioAlimentar) {
            await consulta.addRecordatorioAlimentar(recordatorioAlimentar)
          } */
        }) // tx.commit
        // 'consulta' ('result') fica disponível apenas após o commit
        return {
          ok: true,
          consulta: result
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
