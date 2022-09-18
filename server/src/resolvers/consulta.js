/**
 * @description Operações sobre a tabela de consultas
 * @module src/resolvers/consulta
 * @author Josafá Santos dos Reis
 */

import { createHmac } from 'crypto'
import { Op } from 'sequelize'
import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de consulta
     */
    consultas: async (_, __, { models }) => {
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
    consulta: async (_, { id, pacienteId }, { models }) => {
      const consulta = await models.Consulta.findByPk(id, {
        attributes: { exclude: ['updatedAt'] },
        include: [
          {
            association: 'responsaveis',
            attributes: ['id', 'nomes']
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
            association: 'complementoRecordatorioAlimentar',
            attributes: ['id', 'complemento'],
          }, {
            association: 'exameFisico',
            attributes: ['id', 'nome'],
            include: {
              association: 'tipoExameFisico',
              attributes: ['id', 'nome']
            }
          }, {
            association: 'complementosExameFisico',
            attributes: ['id', 'complemento'],
            include: {
              association: 'tipoExameFisico',
              attributes: ['id', 'nome']
            }
          }, {
            association: 'indicadoresExameFisico'
          }, /* {
            association: 'avaliacao',
            include: {
              association: 'avaliador',
              include: {
                association: 'pessoa',
                attributes: ['id', 'nome']
              }
            }
          }, */ {
            association: 'antecedentesAtributos',
            include: [
              {
                association: 'antecedenteAtributo',
                include: {
                  association: 'tipoAntecedente'
                }
              }, {
                association: 'antecedente'
              }
            ]
          }, {
            association: 'complementosAntecedentes',
            attributes: ['id', 'complemento'],
            include: {
              association: 'tipoAntecedente'
            }
          }
        ]
      })

      const paciente = await models.Paciente.findByPk(pacienteId, {
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
            association: 'nacionalidade',
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
      })

      return {
        id: consulta.id,
        createdAt: consulta.createdAt,
        primeira: consulta.primeira,
        acompanhante: consulta.acompanhante,
        fonteEncaminhamento: consulta.fonteEncaminhamento,
        historiaDoencaAtual: consulta.historiaDoencaAtual,
        queixaPrincipalObs: consulta.queixaPrincipalObs,
        suspeitasDiagnosticas: consulta.suspeitasDiagnosticas,
        planoConduta: consulta.planoConduta,
        ...consulta,
        paciente
      }
    },

    consultasByPaciente: async (_, { pacienteId }, { models }) => {
      const hashedPacientId = createHmac('sha256', process.env.HASH_PASSWORD)
        .update(pacienteId).digest('hex')
      const consultas = await models.Consulta.findAll({
        include: [
          {
            association: 'queixaPrincipal',
            attributes: ['id', 'nome']
          }, {
            association: 'queixas',
            attributes: ['id', 'nome']
          }
        ],
        // where: { pacienteId }
        where: { pacienteId: hashedPacientId }
      })
      return consultas
    },

    primeiraConsultaOfPaciente: async (_, { pacienteId }, { models }) => {
      try {
        const hashedPacientId = await createHmac('sha256', process.env.HASH_PASSWORD)
          .update(pacienteId).digest('hex')
        const consulta = await models.Consulta.findOne({
          include: [
            {
              association: 'antecedentesAtributos',
              include: [
                {
                  association: 'antecedenteAtributo',
                  include: {
                    association: 'tipoAntecedente'
                  }
                }, {
                  association: 'antecedente'
                }
              ]
            }, {
              association: 'complementosAntecedentes',
              attributes: ['id', 'complemento'],
              include: {
                association: 'tipoAntecedente'
              }
            }
          ],
          where: {
            // [Op.and]: [{ pacienteId }, { primeira: true }]
            [Op.and]: [{ pacienteId: hashedPacientId }, { primeira: true }]
          }
        })

        return consulta
      } catch (error) {
        throw new Error(error)
      }
    }
  },

  Mutation: {

    /**
     * cria um novo registro de consulta
     */
    createConsulta: async (_, {
      pacienteId,
      queixas,
      recordatorioAlimentar,
      complementosQueixas,
      exameFisico,
      ...ohterArgs
    }, { sequelize, models }) => {
      try {
        const hashedPacientId = createHmac('sha256', process.env.HASH_PASSWORD)
          .update(pacienteId).digest('hex')
        
        const recordatorio = (recordatorioAlimentar && recordatorioAlimentar.length > 0)
          ? recordatorioAlimentar.map(item => {
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
          : []

        const complementos = (complementosQueixas && complementosQueixas.length > 0)
          ? complementosQueixas.map(item => {
              const { tipoQueixa } = item
              if (tipoQueixa && tipoQueixa.id) {
                return {
                  complemento: item.complemento,
                  tipoQueixaId: parseInt(item.tipoQueixa.id)
                }
              }
            })
          : []

        // eslint-disable-next-line no-unused-vars
        const result = await sequelize.transaction(async (tx) => {
          const consulta = await models.Consulta.create({
            ...ohterArgs,
            pacienteId: hashedPacientId,
            recordatorioAlimentar: recordatorio,
            complementosQueixas: complementos
          }, {
            include: [
              {
                association: 'recordatorioAlimentar',
                include: {
                  association: 'alimento'
                } /* [{"quantidade": x, "tipoRefeicaoId": y, "alimentoId": z}] */
              }, {
                association: 'complementoRecordatorioAlimentar'
              }, {
                association: 'indicadoresExameFisico'
              }, {
                association: 'responsaveis'
              }, {
                association: 'complementosQueixas'
              }, {
                association: 'complementosExameFisico'
              }, {
                association: 'antecedentesAtributos'
              }, {
                association: 'complementosAntecedentes'
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
        // responsaveis,
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

          /* if(responsaveis && responsaveis.length > 0) {
            await consulta.addResponsaveis(responsaveis)
          } */

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
