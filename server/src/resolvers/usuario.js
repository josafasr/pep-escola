import _ from 'lodash'
import { tryLogin } from '../auth'

/**
 * @file Operações sobre a tabela de usuarios
 * @module resolvers/usuario
 * @author Josafá Santos
 */

const formatErrors = (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    return e.errors.map((x) => _.pick(x, ['path', 'message']))
  }
  return [{ path: 'erro', message: 'Algo deu errado!' }]
}

export default {

  Query: {

    // restorna todos os usuarios
    usuarios: (parent, args, { models }) => models.Usuario.findAll(
      {
        // include: [
        //   {
        //     as: 'grupos',
        //     model: models.Grupo,
        //     through: { attributes: [] }
        //   }
        // ]
      }
    ),
    // busca usuario pelo código
    usuario: (parent, { id }, { models }) => models.Usuario.findByPk(id, {
      include: [
        {
          as: 'grupos',
          model: models.Grupo,
          through: { attributes: [] }
        }
      ]
    })
  },

  Mutation: {

    // cria um novo usuario
    createUsuario: async (parent, args, { models }) => {
      try {
        const usuario = await models.Usuario.create(args)
        //   ...args,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // })
        if (args.grupos && args.grupos.length > 0) {
          usuario.setGrupos(args.grupos)
        }
        return {
          ok: true,
          user: usuario
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    // atualiza dados do usuário
    updateUsuario: async (parent, args, { models }) => {
      const result = await models.Usuario.update({
        nome: args.nome,
        senha: args.senha,
        updatedAt: new Date(),
      }, {
        where: { id: args.id },
        returning: true,
        plain: true
      })

      if (args.grupos && args.grupos.length > 0) {
        const usuario = result[1]
        usuario.addGrupos(args.grupos)
      }
      return result[1]
    },

    // exclui o usuário
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
