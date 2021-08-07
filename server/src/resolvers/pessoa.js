/**
 * @description Operações sobre a tabela de pessoas
 * @module src/resolvers/pessoa
 * @author Josafá Santos dos Reis
 */

import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de pessoa
     */
    pessoas: async (_, __, { models }) => {
      try {
        const pessoas = await models.Pessoa.findAll({
          include: [
            {
              association: 'contato',
              attributes: ['celular', 'email']
            }/* ,
            {
              association: 'enderecos',
              attributes: ['logradouro']
            } */
          ],
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        })

        return pessoas
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * restorna um registro de pessoa pelo id
     */
    pessoa: (_, { id }, { models }) => models.Pessoa.findByPk(id, {
      include: [
        {
          association: 'contato',
          // model: models.Contato,
          attributes: ['celular', 'email']
        },
        {
          association: 'enderecos',
          // model: models.Endereco,
          attributes: ['logradouro']
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

  },

  Mutation: {

    /**
     * cria um novo registro de pessoa
     */
    createPessoa: async (_, args, { sequelize, models }) => {
      try {
        const result = await sequelize.transaction(async (tx) => {
          const pessoa = await models.Pessoa.create(args, {
            /* nome: args.nome,
            dataNascimento: args.dataNascimento,
            sexo: args.sexo
          }, { */
            include: [
              { association: 'contato' }/* ,
              { association: 'enderecos' } */
            ]
          })

          /* if (args.enderecos) {
            pessoa.addEnderecos(args.enderecos)
          } */
          return pessoa
        })
        return {
          ok: true,
          pessoa: result
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    /**
     * atualiza um registro de pessoa, dado o id
     */
    updatePessoa: async (_, { id, enderecos, ...rest }, { models }) => {
      try {
        const pessoa = await models.Pessoa.findByPk(id)
        if ({ ...rest }) {
          await pessoa.update({ ...rest }, {
            where: { id },
            returning: true,
            plain: true
          })
        }

        if (enderecos) {
          await pessoa.addEnderecos(enderecos)
        }
        return {
          ok: true,
          pessoa
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    /**
     * exclui um registro de pessoa, dado o id
     */
    deletePessoa: (_, { id }, { models }) => models.Pessoa.destroy({
      where: {
        id
      }
    })
  }
}
