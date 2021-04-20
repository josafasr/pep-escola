/**
 * @title Operações sobre a tabela de comlemento de queixas na consulta
 * @module src/resolvers/complemento-consulta-tipo-queixa
 * @author Josafá Santos dos Reis
 */

import ComplementosConsultaTipoQueixa from '../data/complemento-consulta-tipo-queixa'

export default {

  Query: {

    // Retorna todos os registros de complementos de queixas
    complementosConsultaTipoQueixa: (_, __) => ComplementosConsultaTipoQueixa.findAll(),

    // Busca um registro de complemento de queixas pelo código
    complementoConsultaTipoQueixa: (_, { id }) => ComplementosConsultaTipoQueixa.findByPk(id),

    // Retorna registros de complementos de queixas pelo id da consulta
    complementosQueixasByConsulta: (_, { consultaId }) => ComplementosConsultaTipoQueixa.findByConsultaPk(consultaId),
  },

  Mutation: {

    // Cria um novo registro de complemento de queixas
    createComplementoConsultaTipoQueixa: (_, args) => ComplementosConsultaTipoQueixa.create(args),

    // Atualiza um registro de complemento de queixas
    updateComplementoConsultaTipoQueixa: (_, args) => ComplementosConsultaTipoQueixa.update(args, {
      where: {
        id: args.id
      },
      returning: true,
      plain: true
    })
      .then((result) => {
        result[1]
      }),

    // Exclui um registro de complemento de queixas
    deleteComplementoConsultaTipoQueixa: (_, { id }) => ComplementosConsultaTipoQueixa.delete(id)
  }
}