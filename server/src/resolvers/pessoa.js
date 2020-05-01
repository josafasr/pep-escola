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
    pessoas: (parent, args, { models }) => models.Pessoa.findAll({
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
    }),

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
    // createPessoa: async (parent, { endereco, otherArgs }, { models }) => {
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
    updatePessoa: async (parent, args, { models }) => {
      try {
        const result = await models.Pessoa.update({
          nome: args.nome,
          dataNascimento: args.dataNascimento,
          sexo: args.sexo,
          contatoId: args.contatoId
        }, {
          where: { id: args.id },
          returning: true,
          plain: true
        })
        const pessoa = result[1]
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
    deletePessoa: (parent, { id }, { models }) => models.Pessoa.destroy({
      where: {
        id
      }
    })
  }
}
