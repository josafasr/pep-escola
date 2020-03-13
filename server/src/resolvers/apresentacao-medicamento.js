/**
 * @file Operações sobre a tabela de apresentações de medicamentos
 * @module resolvers/apresentacao-medicamento
 * @author Josafá Santos
 */
export default {

  Query: {

    // restorna todos os grupos
    apresentacoesMedicamentos: (parent, args, { models }) => models.ApresentacaoMedicamento.findAll({
      include: [
        {
          as: 'medicamentos',
          model: models.Medicamento
        }
      ]
    }),

    // busca apresentacaoMedicamento pelo código
    apresentacaoMedicamento: (parent, { id }, { models }) => models.ApresentacaoMedicamento.findByPk(id, {
      include: [
        {
          as: 'medicamentos',
          model: models.Medicamento
        }
      ]
    })
  },

  Mutation: {

    // cria um novo apresentacaoMedicamento
    createApresentacaoMedicamento: (parent, args, { models }) => models.ApresentacaoMedicamento.create({
      nome: args.nome,
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    // atualiza dados do apresentacaoMedicamento
    updateApresentacaoMedicamento: (parent, args, { models }) => models.ApresentacaoMedicamento.update({
      nome: args.nome,
      updatedAt: new Date(),
    }, {
      where: {
        id: args.id
      },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    // exclui o apresentacaoMedicamento
    deleteApresentacaoMedicamento: (parent, { id }, { models }) => models.ApresentacaoMedicamento.destroy({
      where: {
        id
      }
    })
  }
}
