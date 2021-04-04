/**
 * @file Operações sobre a tabela de pessoas
 * @module src/resolvers/pessoa
 * @author Josafá Santos dos Reis
 */

import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de pessoa
     */
    pessoas: async (parent, args, { models }) => {
      try {
        const pessoas = await models.Pessoa.findAll({
          include: [
            {
              association: 'contato',
              attributes: ['celular', 'email']
            },
            {
              association: 'enderecos',
              attributes: ['logradouro']
            }
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
    pessoa: (parent, { id }, { models }) => models.Pessoa.findByPk(id, {
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
    createPessoa: async (parent, args, { models }) => {
      try {
        const pessoa = await models.Pessoa.create({
          nome: args.nome,
          dataNascimento: args.dataNascimento,
          sexo: args.sexo,
          contatoId: args.contatoId
        })

        if (args.enderecos) {
          pessoa.addEnderecos(args.enderecos)
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
     * atualiza um registro de pessoa, dado o id
     */
    updatePessoa: async (parent, { id, enderecos, ...rest }, { models }) => {
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
    deletePessoa: (parent, { id }, { models }) => models.Pessoa.destroy({
      where: {
        id
      }
    })
  }
}
