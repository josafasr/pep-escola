/**
 * @description Operações sobre a tabela de comlemento de exames físicos na consulta
 * @module src/resolvers/complemento-consulta-exame-fisico
 * @author Josafá Santos dos Reis
 */

import ComplementosConsultaExameFisico from '../data/complemento-consulta-exame-fisico'

export default {

  Query: {

    // Retorna todos os registros de complementos de exames físicos
    complementosConsultaExameFisico: (_, __) => ComplementosConsultaExameFisico.findAll(),

    // Busca um registro de complemento de exames físicos pelo código
    complementoConsultaExameFisico: (_, { id }) => ComplementosConsultaExameFisico.findByPk(id),

    // Retorna registros de complementos de exames físicos pelo id da consulta
    complementosExameFisicoByConsulta: (_, { consultaId }) => ComplementosConsultaExameFisico.findByConsultaPk(consultaId),
  },

  Mutation: {

    // Cria um novo registro de complemento de exames físicos
    createComplementoConsultaExameFisico: (_, args) => ComplementosConsultaExameFisico.create(args),

    // Atualiza um registro de complemento de exames físicos
    updateComplementoConsultaExameFisico: (_, args) => ComplementosConsultaExameFisico.update(args, {
      where: {
        id: args.id
      },
      returning: true,
      plain: true
    })
    .then((result) => {
      result[1]
    })
  }
}