/**
 * @file Operações sobre a tabela de cidades
 * @module resolvers/cidade
 * @author Josafá Santos
 */

import { Op } from 'sequelize'

export default {

  Query: {

    // restorna todas as cidades
    cidades: (parent, args, { models }) => models.Cidade.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { id: { [Op.in]: ['10211', '10407', '1'] }}
    }),

    // restorna as cidades cujos nomes inicial com o texto digitado
    cidadesByText: (_, args, { models }) => models.Cidade.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { nome: { [Op.like]: `${args.text}%` }},
      include: {
        association: 'estado'
      }
    }),

    // restorna todas as cidades com respectivos estados
    // cidadesWithEstado: (parent, args, { models }) => models.Cidade.findAll({
    //   include: [
    //     { as: 'estado', model: models.Estado }
    //   ],
    //   attributes: { exclude: ['createdAt', 'updatedAt'] }
    // }),

    // busca cidade pelo id
    cidade: (parent, { id }, { models }) => models.Cidade.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }),

    // busca cidade, com estado, pelo id
    // cidadeWithEstado: (parent, { id }, { models }) => models.Cidade.findByPk(id, {
    //   include: [
    //     { as: 'estado', model: models.Estado, attributes: ['nome', 'sigla'] }
    //   ],
    //   attributes: { exclude: ['createdAt', 'updatedAt'] }
    // })

  },

  Mutation: {

    // inserir nova cidade
    createCidade: async (parent, args, { models }) => {
      const result = await models.Cidade.create({
        nome: args.nome,
        codigoIBGE: args.codigoIBGE,
        estadoId: args.estadoId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return result
    },

    // atualizar cidade
    updateCidade: async (parent, args, { models }) => {
      const result = await models.Cidade.update({
        nome: args.nome,
        codigoIBGE: args.codigoIBGE,
        estadoId: args.estadoId,
        updatedAt: new Date(),
      }, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      return result[1]
    },

    // excluir uma cidade
    deleteCidade: (parent, { id }, { models }) => models.Cidade.destroy({
      where: {
        id
      }
    })
  }
}
