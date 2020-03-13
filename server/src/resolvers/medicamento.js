/**
 * @file Operações sobre a tabela de medicamentos
 * @module resolvers/medicamento
 * @author Josafá Santos
 */
export default {

  Query: {

    // restorna todos os medicamentos
    medicamentos: (parent, args, { models }) => models.Medicamento.findAll({
      include: [
        {
          as: 'apresentacao',
          model: models.ApresentacaoMedicamento
        }
      ]
    }),

    // busca medicamento pelo código
    medicamento: (parent, { id }, { models }) => models.Medicamento.findByPk(id, {
      include: [
        {
          as: 'apresentacao',
          model: models.ApresentacaoMedicamento
        }
      ]
    })
  },

  Mutation: {

    // cria um novo medicamento
    createMedicamento: async (parent, args, { models }) => {
      const medicamento = await models.Medicamento.create({
        nome: args.nome,
        dose: args.dose,
        apresentacaoMedicamentoId: args.apresentacaoMedicamentoId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return models.Medicamento.findByPk(medicamento.id, {
        include: [
          {
            as: 'apresentacao',
            model: models.ApresentacaoMedicamento
          }
        ]
      })
    },

    // atualiza dados do medicamento
    updateMedicamento: (parent, args, { models }) => models.Medicamento.update({
      nome: args.nome,
      dose: args.dose,
      apresentacaoMedicamentoId: args.apresentacaoMedicamentoId,
      updatedAt: new Date(),
    },
    {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    // exclui o medicamento
    deleteMedicamento: (parent, { id }, { models }) => models.Medicamento.destroy({
      where: {
        id
      }
    })
  }
}
