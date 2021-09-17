/**
 * @description Operações sobre a tabela de pacientes
 * @module src/resolvers/paciente
 * @author Josafá Santos dos Reis
 */

import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de paciente
     */
    pacientes: async (_, __, { models }) => {
      const pacientes = await models.Paciente.findAll({
        include: [
          {
            association: 'pessoa',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
              association: 'contato',
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            }, {
              association: 'enderecos',
              attributes: ['logradouro', 'numero']
            }]
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order: [ 'prontuario' ]
      })
      return pacientes
    },

    /**
     * restorna um registro de paciente pelo id
     */
    paciente: async (_, { id }, { models }) => {
      const paciente = await models.Paciente.findByPk(id, {
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
            attributes: ['id', 'nome', 'cnes']
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
            association: 'tempoEstudo',
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
          }/* , {
            association: 'antecedentesPatologicos',
            attributes: ['id', 'tempoDiagnostico'],
            include: {
              association: 'patologia',
              attributes: ['id', 'nome'],
              include: {
                association: 'tipoPatologia',
                attributes: ['id', 'nome']
              }
            }
          }, {
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
          } */
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      return paciente
    }

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
     * cria um novo registro de paciente, incluindo novas dependências
     */
    createWithIncludes: async (parent, { pessoa, especialidades, ...otherArgs }, { sequelize, models }) => {
      try {
        const result = await sequelize.transaction(async (tx) => {
          const paciente = await models.Paciente.create({
            ...otherArgs,
            pessoa
          }, {
            include: [{
              association: 'pessoa',
              include: [{
                association: 'contato'
              }, {
                association: 'enderecos'
              }]
            }]
          })
          if (especialidades) {
            await paciente.addEspecialidades(especialidades)
          }
          return paciente // para 'result' receber 'paciente'
        }) // tx.commit
        // 'paciente' ('result') fica disponível apenas após o commit
        return {
          ok: true,
          paciente: result
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
    // updatePaciente: async (_, { id, especialidades, antecedentesPatologicos, ...otherArgs }, { sequelize, models }) => {
    updatePaciente: async (_, { id, especialidades, pessoa, ...otherArgs }, { sequelize, models }) => {
      try {
        const result = await sequelize.transaction(async (tx) => {
          const paciente = await models.Paciente.findOne({
            where: { id },
            include: {
              association: 'pessoa',
              include: [
                { association: 'contato' },
                { association: 'enderecos' }
              ]
            }
          })

          const attributes = { ...otherArgs }
          if (attributes) {
            await paciente.update(attributes, {
              returning: true,
              plain: true
            })
          }

          if (pessoa) {
            const pessoaToUpdate = paciente.pessoa
            await pessoaToUpdate.update(pessoa)

            const contato = pessoa.contato
            if (contato) {
              const contatoToUpdate = pessoaToUpdate.contato
              await contatoToUpdate.update(contato)
            }

            const endereco = pessoa.enderecos[0]
            if (endereco) {
              const enderecoToUpdate = pessoaToUpdate.enderecos[0]
              await enderecoToUpdate.update(endereco)
            }

            /* const enderecos = pessoa.enderecos
            if (enderecos) {
              await pessoaToUpdate.setEnderecos(enderecos)
            } */
          }

          if (especialidades) {
            await paciente.addEspecialidades(especialidades)
          }
          return paciente
        })

        return {
          ok: true,
          paciente: result
        }

      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    /**
     * atualiza um registro de paciente, dado o id
     */
     /* updateAntecedentesPatologicos: async (parent, { id, antecedentesPatologicos }, { models }) => {
      try {
        const paciente = await models.Paciente.findByPk(id)

        if (antecedentesPatologicos) {
          paciente.addAntecedentesPatologicos(antecedentesPatologicos)
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
    }, */



    /**
     * exclui um registro de paciente, dado o id
     */
    deletePaciente: (parent, { id }, { models }) => models.Paciente.destroy({
      where: {
        id
      }
    })
  }
}
