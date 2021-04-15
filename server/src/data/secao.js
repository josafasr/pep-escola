/**
 * @title Operações sobre a tabela de secoes
 * @module src/data/secao
 * @author Josafá Santos dos Reis
 */

import db from '../models'

export default {
  
  findAll: async () => {
    try {
      const secoes = await db.Secao.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      return secoes
    } catch (error) {
      console.log(error)
    }
  },
  
  findByPk: async (id) => {
    try {
      const secao = await db.Secao.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      return secao
    } catch (error) {
      console.log(error)
    }
  },

  create: async (args) => {
    const { sequelize } = db
    try {
      const result = await sequelize.transaction(async (tx) => {
        const secao = await db.Secao.create(args)
        return secao
      })
      return {
        statusCode: 200,
        secao: result
      }
    } catch (err) {
      return {
        statusCode: 400,
        message: 'Os argumentos não podem estar vazios!'
      }
    }
  },

  update: async (args) => {
    const { sequelize } = db
    try {
      const result = await sequelize.transaction(async (tx) => {
        const update = await db.Secao.update({
            nome: args.nome
          }, {
            where: { id: args.id },
            returning: true,
            plain: true
          }
        )
        return update[1]
      })
      return {
        statusCode: 200,
        secao: result
      }
    } catch (err) {
      return {
        statusCode: 400,
        message: 'Os argumentos não podem estar vazios!'
      }
    }
  },

  delete: async (id) => {
    await db.Secao.destroy({
      where: { id }
    })
  }
}