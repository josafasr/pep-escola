/**
 * @title Operações sobre a tabela de consultas
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
    consulta: async (_, { id }, { models }) => {
      const consulta = await models.Consulta.findByPk(id, {
        attributes: { exclude: ['updatedAt'] },
        include: [
          {
            association: 'responsaveis',
            include: {
              association: 'pessoa',
              attributes: ['id', 'nome']
            }
          }, {
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
            association: 'queixaPrincipal',
            attributes: ['id', 'nome']
          }, {
            association: 'queixas',
            attributes: ['id', 'nome'],
            include: {
              association: 'tipoQueixa',
              attributes: ['id', 'nome']
            }
          }, {
            association: 'complementosQueixas',
            attributes: ['id', 'complemento'],
            include: {
              association: 'tipoQueixa',
              attributes: ['id', 'nome']
            }
          }, {
            association: 'recordatorioAlimentar',
            attributes: ['id', 'quantidade'],
            include: [
              {
                association: 'alimento',
                attributes: ['id', 'nome']
              }, {
                association: 'tipoRefeicao',
                attributes: ['id', 'nome']
              }
            ]
          }, {
            association: 'exameFisico',
            include: {
              association: 'tipoExameFisico'
            }
          }, {
            association: 'indicadoresExameFisico'
          }, {
            association: 'avaliacao',
            include: {
              association: 'avaliador',
              include: {
                association: 'pessoa',
                attributes: ['id', 'nome']
              }
            }
          }
        ]
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
    createConsulta: async (_, {
      queixas,
      recordatorioAlimentar,
      complementosQueixas,
      exameFisico,
      ...ohterArgs
    }, { sequelize, models }) => {
      try {
        const recordatorio = recordatorioAlimentar.map(item => {
          const { alimento } = item
          if (alimento && alimento.id) {
            return {
              quantidade: item.quantidade,
              alimentoId: parseInt(item.alimento.id),
              tipoRefeicaoId: parseInt(item.tipoRefeicao.id)
            }
          } else {
            return {
              quantidade: item.quantidade,
              alimento: {
                nome: item.alimento.nome
              },
              tipoRefeicaoId: parseInt(item.tipoRefeicao.id)
            }
          }
        })

        const complementos = complementosQueixas.map(item => {
          const { tipoQueixa } = item
          if (tipoQueixa && tipoQueixa.id) {
            return {
              complemento: item.complemento,
              tipoQueixaId: parseInt(item.tipoQueixa.id)
            }
          }
        })

        const result = await sequelize.transaction(async (tx) => {
          const consulta = await models.Consulta.create({
            ...ohterArgs,
            recordatorioAlimentar: recordatorio,
            complementosQueixas: complementos
          }, {
            include: [
              {
                association: 'recordatorioAlimentar',
                include: {
                  association: 'alimento'
                }
              }, /* [{"quantidade": x, "tipoRefeicaoId": y, "alimentoId": z}] */
              {
                association: 'indicadoresExameFisico'
              },
              {
                association: 'complementosQueixas'
              }
            ]
          })
          if (queixas) {
            await consulta.addQueixas(queixas)
          }
          if (exameFisico) {
            await consulta.addExameFisico(exameFisico)
          }
          return consulta  // para 'result' receber 'consulta'
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
    updateConsulta: async (
      _,
      {
        id,
        queixas,
        recordatorioAlimentar,
        responsaveis,
        ...otherArgs
      }, { sequelize, models }) => {
      try {
        const result = await sequelize.transaction(async (tx) => {
          const consulta = await models.Consulta.findByPk(id)
          if (otherArgs.length > 0) {
            await consulta.update({ ...otherArgs }, {
              returning: true,
              plain: true
            })
          }

          if (recordatorioAlimentar) {
            await consulta.addRecordatorioAlimentar(recordatorioAlimentar)
          }

          if (queixas) {
            await consulta.addQueixas(queixas)
          }

          if(responsaveis && responsaveis.length > 0) {
            await consulta.addResponsaveis(responsaveis)
          }

          return consulta
        })
        
        return {
          ok: true,
          consulta: result[1]
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
