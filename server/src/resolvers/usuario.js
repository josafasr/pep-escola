/**
 * @title Operações sobre a tabela de usuarios
 * @module src/resolvers/usuario
 * @author Josafá Santos dos Reis
 */

import _ from 'lodash'
import { Op } from 'sequelize'
import { formatErrors } from '../format-errors'
import { tryLogin } from '../auth'

export default {

  Query: {

    /**
     * retorna todos os registros de usuário
     */
    usuarios: async (parent, args, { models }) => {
      const usuarios = await models.Usuario.findAll({
        include: [
        {
          association: 'pessoa',
          attributes: ['id', 'nome', 'dataNascimento', 'sexo'],
          include: [
          {
            association: 'contato',
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          },
          {
            association: 'enderecos',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
            {
              association: 'tipoLogradouro',
              attributes: ['id', 'nome']
            },
            {
              association: 'cidade',
              attributes: ['id', 'nome']
            }]
          }]
        },
        {
          association: 'grupos',
          attributes: ['id', 'nome']
        }],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      return usuarios
    },
    
    /**
     * restorna um registro de usuário pelo id
     */
    usuario: async (parent, { id }, { models }) => {
      const usuario = await models.Usuario.findByPk(id, {
        include: [
        {
          association: 'pessoa',
          attributes: ['id', 'nome', 'dataNascimento', 'sexo'],
          include: [
          {
            association: 'contato',
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          },
          {
            association: 'enderecos',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
            {
              association: 'tipoLogradouro',
              attributes: ['id', 'nome']
            },
            {
              association: 'cidade',
              attributes: ['id', 'nome']
            }]
          }]
        },
        {
          association: 'grupos',
          attributes: ['id', 'nome']
        }],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      return usuario
    },

    usuariosByText: async (_, { text }, { models }) => {
      const usuarios = await models.Usuario.findAll({
        attributes: ['id'],
        include: {
          association: 'pessoa',
          attributes: ['id', 'nome'],
          where: {
            nome: { [Op.like]: `${text}%` }
          }
        }
      })
      return usuarios
    },

    login: async (parent, { nome, senha }, { models, SECRET, SECRET2 }) => tryLogin(nome, senha, models, SECRET, SECRET2)
  },

  Mutation: {

    /**
     * cria um novo registro de usuário
     */
    createUsuario: async (parent, args, { models, user }) => {
    //  if (user) {
        try {
          const usuario = await models.Usuario.create({
            nome: args.nome,
            senha: args.senha,
            pessoaId: args.pessoaId
          })

          if (args.grupos && args.grupos.length > 0) {
            usuario.addGrupos(args.grupos)
          }
          return {
            ok: true,
            usuario
          }
        } catch (err) {
          return {
            ok: false,
            errors: formatErrors(err, models)
          }
        }
     // }
    },

    /**
     * cria um novo registro de usuário com dependências
     */
    createUsuarioWithIncludes: async (parent, { grupos, ...otherArgs }, { sequelize, models, user }) => {
      //  if (user) {
      try {
        const result = await sequelize.transaction(async (tx) => {
          const usuario = await models.Usuario.create({ ...otherArgs }, {
            include: [{
              association: 'pessoa',
              include: [
                { association: 'contato' },
                { association: 'enderecos' }
              ]
            }]
          })
          if (grupos && grupos.length > 0) {
            usuario.addGrupos(grupos)
          }
          return usuario
        })
        return {
          ok: true,
          usuario: result
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    // }
    },

    /**
     * atualiza um registro de usuário, dado o id
     */
    updateUsuario: async (parent, { id, grupos, ...rest }, { models }) => {
      try {
        const usuario = await models.Usuario.findByPk(id)
        if ({ ...rest }) {
          await usuario.update({ ...rest }, {
            where: { id },
            returning: true,
            plain: true
          })
        }

        if (grupos) {
          await usuario.addGrupos(grupos)
        }
        return {
          ok: true,
          usuario
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    /**
     * exclui um registro de usuário, dado o id
     */
    deleteUsuario: async (parent, { id }, { models }) => {
      try {
        models.Usuario.destroy({
          where: { id }
        })
        return true
      } catch (err) {
        return false
      }
    }
  }
}
