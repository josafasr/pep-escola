/**
 * @file Operações sobre a tabela de tipos de logradouro
 * @module resolvers/tipo-logradouro
 * @author Josafá Santos
 */
export default {

  Query: {

    /**
     * retorna todos os registros de tipo de logradouro
     */
    tiposLogradouro: (parent, args, { models }) => models.TipoLogradouro.findAll(),

    /**
     * restorna um registro de tipo de logradouro pelo id
     */
    tipoLogradouro: (parent, { id }, { models }) => models.TipoLogradouro.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de tipo de logradouro
     */
    createTipoLogradouro: (parent, args, { models }) => models.TipoLogradouro.create({
      nome: args.nome,
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    /**
     * atualiza um registro de tipo de logradouro, dado o id
     */
    updateTipoLogradouro: (parent, args, { models }) => models.TipoLogradouro.update({
      nome: args.nome,
      updatedAt: new Date(),
    }, {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    /**
     * exclui exclui um registro de tipo de logradouro, dado o id
     */
    deleteTipoLogradouro: (parent, { id }, { models }) => models.TipoLogradouro.destroy({
      where: {
        id
      }
    })
  }
}
