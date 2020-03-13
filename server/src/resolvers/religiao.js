/**
 * @file Operações sobre a tabela de religiões
 * @module resolvers/religiao
 * @author Josafá Santos
 */
export default {

  Query: {

    /**
     * retorna todos os registros de religião
     */
    religioes: (parent, args, { models }) => models.Religiao.findAll(),

    /**
     * restorna um registro de religião pelo id
     */
    religiao: (parent, { id }, { models }) => models.Religiao.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de religião
     */
    createReligiao: (parent, args, { models }) => models.Religiao.create({
      nome: args.nome,
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    /**
     * atualiza um registro de religião, dado o id
     */
    updateReligiao: (parent, args, { models }) => models.Religiao.update({
      nome: args.nome,
      updatedAt: new Date(),
    }, {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    /**
     * exclui exclui um registro de religião, dado o id
     */
    deleteReligiao: (parent, { id }, { models }) => models.Religiao.destroy({
      where: {
        id
      }
    })
  }
}
