/**
 * @description Operações sobre a tabela de usuarios
 * @module src/resolvers/usuario
 * @author Josafá Santos dos Reis
 */

import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { formatErrors } from '../format-errors'
import { tryLogin } from '../auth'
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../access'
import { sendRefreshToken } from '../send-refresh-token'

export default {

  Query: {

    /**
     * retorna todos os registros de usuário
     */
    usuarios: async (_, __, { models }) => {
      const usuarios = await models.Usuario.findAll({
        include: [
        {
          association: 'pessoa',
          attributes: ['id', 'nome', 'dataNascimento', 'sexo'],
          include: [
          {
            association: 'contato',
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }/* ,
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
          } */]
        }/* ,
        {
          association: 'grupos',
          attributes: ['id', 'nome']
        } */],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      return usuarios
    },
    
    /**
     * restorna um registro de usuário pelo id
     */
    usuario: async (_, { id }, { models }) => {
      const usuario = await models.Usuario.findByPk(id, {
        include: [
        {
          association: 'pessoa',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
          {
            association: 'contato',
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }/* ,
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
          } */]
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

    currentUser: async (_, __, { models, req }) => {
      const [, token] = req.headers.authorization.split(' ')
      if (!token) {
        return null
      }

      try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY, { algorithms: ['RS512'] })
        return await models.Usuario.findOne({
          where: { id: payload.userId },
          include: {
            association: 'pessoa',
            attributes: [ 'id', 'nome' ],
            include: {
              association: 'contato',
              attributes: [ 'id', 'email' ],
            }
          }
        })
      } catch (error) {
        console.log(error)
        return null
      }
    },

    login: async (_, { nome, senha }, { models, res }) => {
      return await tryLogin(nome, senha, models, res)
    },

    refreshToken: async (_, __, { models, req, res }) => {
      const refreshToken = req.cookies.jid

      if (!refreshToken)
        return { ok: false, token: '' }
      
      let payload = null
      try {
        payload = verifyRefreshToken(refreshToken) //jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, { algorithms: ['RS512'] })
      } catch (error) {
        return { ok: false, token: '' }
      }

      const user = await models.Usuario.findOne({ where: { id: payload.userId }, raw: true})
      if (!user)
        return { ok: false, token: '' }

      if (user.tokenVersion !== payload.tokenVersion)
        return { ok: false, token: '' }

      sendRefreshToken(res, createRefreshToken(user))

      const accessToken = createAccessToken(user)

      return {
        ok: true,
        token: accessToken
      }
    }
  },

  Mutation: {

    /**
     * cria um novo registro de usuário
     */
    createUsuario: async (_, args, { models }) => {
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
    },

    /**
     * cria um novo registro de usuário com dependências
     */
    createUsuarioWithIncludes: async (_, { grupos, ...otherArgs }, { sequelize, models }) => {
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
    },

    /**
     * atualiza um registro de usuário, dado o id
     */
    updateUsuario: async (_, { id, grupos, ...rest }, { sequelize, models }) => {
      try {
        const result = await sequelize.transaction(async (tx) => {
          const usuario = await models.Usuario.findByPk(id)
          if ({ ...rest }) {
            await usuario.update({ ...rest }, {
              // where: { id },
              include: {
                association: 'pessoa',
                include: { association: 'contato' }
              },
              returning: true,
              plain: true
            })
          }

          if (grupos) {
            await usuario.addGrupos(grupos)
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
    },

    /**
     * exclui um registro de usuário, dado o id
     */
    deleteUsuario: async (_, { id }, { models }) => {
      try {
        models.Usuario.destroy({
          where: { id }
        })
        return true
      } catch (err) {
        return false
      }
    },

    logout: (_, __, { res }) => {
      sendRefreshToken(res, '')
      return true
    },
  
    revokeRefreshToken: async (_, { userId }, { models }) => {
      await models.Usuario.increment('tokenVersion', {
        where: { id: userId }
      })
    },

    changePassword: async (_, { id, previousPassword, newPassword }, { sequelize, models }) => {
      try {
        const usuario = await models.Usuario.findByPk(id)
        const isValid = await bcrypt.compare(previousPassword, usuario.senha)
        
        if (isValid) {
            await sequelize.transaction(async (tx) => {
              await models.Usuario.update({
                senha: newPassword
              }, {
                where: { id },
                returning: true,
                plain: true
              })
          })
          return { ok: true }
        } else {
          return {
            ok: false,
            errors: [{ path: 'changePassword', message: 'Dados incorretos!' }]
          }
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    }
  }
}
