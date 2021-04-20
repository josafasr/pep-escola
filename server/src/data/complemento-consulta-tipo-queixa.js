/**
 * @title Operações sobre a tabela de secoes
 * @module src/data/complemento-consulta-tipo-queixa
 * @author Josafá Santos dos Reis
 */

import db from '../models'
import { formatErrors } from '../format-errors'

export default {
  
  findAll: async () => {
    try {
      const complementosConsultaTipoQueixa = await db.ComplementoConsultaTipoQueixa.findAll({
        include: [
          {
            association: 'consulta',
            attributes: [ 'id', 'createdAt' ],
            include: {
              association: 'paciente',
              attributes: [ 'id', 'prontuario' ],
              include: {
                association: 'pessoa',
                attributes: [ 'id', 'nome' ]
              }
            }
          }, {
            association: 'tipoQueixa',
            attributes: ['id', 'nome']
          }
        ]
      })
      return complementosConsultaTipoQueixa
    } catch (error) {
      console.log(error)
    }
  },
  
  findByPk: async (id) => {
    try {
      const complementoConsultaTipoQueixa = await db.ComplementoConsultaTipoQueixa.findByPk(id, {
        include: [
          {
            association: 'consulta',
            attributes: [ 'id', 'createdAt' ],
            include: {
              association: 'paciente',
              attributes: [ 'id', 'prontuario' ],
              include: {
                association: 'pessoa',
                attributes: [ 'id', 'nome' ]
              }
            }
          }
        ]
      })
      return complementoConsultaTipoQueixa
    } catch (error) {
      console.log(error)
    }
  },

  findByConsultaPk: async (consultaId) => {
    try {
      const complementos = await db.ComplementoConsultaTipoQueixa.findAll({
        where: { consultaId },
        include: [
          {
            association: 'consulta',
            attributes: [ 'id' ]
          }, {
            association: 'tipoQueixa',
            attributes: [ 'id', 'nome' ]
          }
        ]
      })
      return complementos
    } catch (error) {
      throw new Error(error)
    }
  },

  create: async (args) => {
    const { sequelize } = db
    try {
      const result = await sequelize.transaction(async (tx) => {
        const complementoConsultaTipoQueixa = await db.ComplementoConsultaTipoQueixa.create(args)
        return complementoConsultaTipoQueixa
      })
      return {
        ok: true,
        complementoConsultaTipoQueixa: result
      }
    } catch (err) {
      return {
        ok: false,
        errors: formatErrors(err, db)
      }
    }
  },

  update: async (args) => {
    const { sequelize } = db
    try {
      const result = await sequelize.transaction(async (tx) => {
        const update = await db.ComplementoConsultaTipoQueixa.update({
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
        complementoConsultaTipoQueixa: result
      }
    } catch (err) {
      return {
        statusCode: 400,
        message: 'Os argumentos não podem estar vazios!'
      }
    }
  },

  delete: async (id) => {
    console.log('id: ', id);
    return await db.ComplementoConsultaTipoQueixa.destroy({
      where: { id }
    })
  }
}