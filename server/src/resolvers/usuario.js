/**
 * @file Operações sobre a tabela de usuarios
 * @module src/resolvers/usuario
 * @author Josafá Santos dos Reis
 */

import _ from 'lodash'
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
            association: 'grupos',
            attributes: ['nome']
          },
          {
            association: 'pessoa',
            attributes: ['nome'],
            include: [{
              association: 'contato',
              attributes: ['email']
            }]
          }
        ],
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
            attributes: ['nome'],
            include: [{
              association: 'contato',
              attributes: ['email']
            }]
          },
          {
            association: 'grupos',
            attributes: ['nome']
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      return usuario
    }
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
     * atualiza um registro de usuário, dado o id
     */
    updateUsuario: async (parent, args, { models }) => {
      try {
        const result = await models.Usuario.update({
          nome: args.nome,
          senha: args.senha,
          pessoaId: args.pessoaId
        }, {
          where: { id: args.id },
          returning: true,
          plain: true
        })
        const usuario = result[1]
        if (args.grupos) {
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
    },

    login: async (parent, { nome, senha }, { models, SECRET, SECRET2 }) => tryLogin(nome, senha, models, SECRET, SECRET2)
  }
}
