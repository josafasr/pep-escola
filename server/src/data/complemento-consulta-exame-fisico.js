/**
 * @description Operações sobre a tabela de complementos de exames físico
 * @module src/data/complemento-consulta-exame-fisico
 * @author Josafá Santos dos Reis
 */

import db from '../models'
import { formatErrors } from '../format-errors'

export default {
  
  findAll: async () => {
    try {
      const complementosConsultaExameFisico = await db.ComplementoConsultaExameFisico.findAll({
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
            association: 'tipoExameFisico',
            attributes: ['id', 'nome']
          }
        ]
      })
      return complementosConsultaExameFisico
    } catch (error) {
      console.log(error)
    }
  },
  
  findByPk: async (id) => {
    try {
      const complementoConsultaExameFisico = await db.ComplementoConsultaExameFisico.findByPk(id, {
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
      return complementoConsultaExameFisico
    } catch (error) {
      console.log(error)
    }
  },

  findByConsultaPk: async (consultaId) => {
    try {
      const complementos = await db.ComplementoConsultaExameFisico.findAll({
        where: { consultaId },
        include: [
          {
            association: 'consulta',
            attributes: [ 'id' ]
          }, {
            association: 'tipoExameFisico',
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
        const complementoConsultaExameFisico = await db.ComplementoConsultaExameFisico.create(args)
        return complementoConsultaExameFisico
      })
      return {
        ok: true,
        complementoConsultaExameFisico: result
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
        const update = await db.ComplementoConsultaExameFisico.update({
            complemento: args.complemento
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
        complementoConsultaExameFisico: result
      }
    } catch (err) {
      return {
        statusCode: 400,
        message: 'Os argumentos não podem estar vazios!'
      }
    }
  }
}