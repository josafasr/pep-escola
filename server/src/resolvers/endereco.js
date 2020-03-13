/**
 * @file Operações sobre a tabela de endereços
 * @module resolvers/endereco
 * @author Josafá Santos
 */
export default {

  Query: {

    /**
     * retorna todos os registros de endereço
     */
    enderecos: (parent, args, { models }) => models.Endereco.findAll(),

    /**
     * restorna um registro de endereço pelo id
     */
    endereco: (parent, { id }, { models }) => models.Endereco.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de endereço
     */
    createEndereco: (parent, args, { models }) => models.Endereco.create({
      nome: args.nome,
      numero: args.numero,
      bairro: args.bairro,
      complemento: args.complemento,
      cep: args.cep,
      telefone: args.telefone,
      telefoneOutro: args.telefoneOutro,
      tipoLogradouroId: args.tipoLogradouroId,
      cidadeId: args.cidadeId,
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    /**
     * atualiza um registro de endereço, dado o id
     */
    updateEndereco: (parent, args, { models }) => models.Endereco.update({
      nome: args.nome,
      numero: args.numero,
      bairro: args.bairro,
      complemento: args.complemento,
      cep: args.cep,
      telefone: args.telefone,
      telefoneOutro: args.telefoneOutro,
      tipoLogradouroId: args.tipoLogradouroId,
      cidadeId: args.cidadeId,
      updatedAt: new Date(),
    }, {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    /**
     * exclui exclui um registro de endereço, dado o id
     */
    deleteEndereco: (parent, { id }, { models }) => models.Endereco.destroy({
      where: {
        id
      }
    })
  }
}
