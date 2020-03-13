/**
 * @file Operações sobre a tabela de pessoas
 * @module resolvers/pessoa
 * @author Josafá Santos
 */
export default {

  Query: {

    /**
     * retorna todos os registros de pessoa
     */
    pessoas: (parent, args, { models }) => models.Pessoa.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }),

    /**
     * restorna um registro de pessoa pelo id
     */
    pessoa: (parent, { id }, { models }) => models.Pessoa.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

  },

  Mutation: {

    /**
     * cria um novo registro de pessoa
     */
    createPessoa: async (parent, args, { models }) => {
      const pessoa = await models.Pessoa.create({
        nome: args.nome,
        dataNascimento: args.dataNascimento,
        sexo: args.sexo,
        // email: args.email,
        nacionalidadeId: args.nacionalidadeId,
        naturalidadeId: args.naturalidadeId,
        estadoCivilId: args.estadoCivilId,
        religiaoId: args.religiaoId,
        corPeleId: args.corPeleId,
        escolaridadeId: args.escolaridadeId,
        profissaoId: args.profissaoId,
        situacaoProfissionalId: args.situacaoProfissionalId,
        enderecoId: args.enderecoId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      // if (args.sexo) {
      //   usuario.setSexo(args.sexo)
      // }
      return pessoa
    },

    /**
     * atualiza um registro de pessoa, dado o id
     */
    updatePessoa: async (parent, args, { models }) => {
      const result = await models.Pessoa.update({
        nome: args.nome,
        dataNascimento: args.dataNascimento,
        sexo: args.sexo,
        // email: args.email,
        nacionalidadeId: args.nacionalidadeId,
        naturalidadeId: args.naturalidadeId,
        estadoCivilId: args.estadoCivilId,
        religiaoId: args.religiaoId,
        corPeleId: args.corPeleId,
        escolaridadeId: args.escolaridadeId,
        profissaoId: args.profissaoId,
        situacaoProfissionalId: args.situacaoProfissionalId,
        enderecoId: args.enderecoId,
        updatedAt: new Date(),
      }, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      const pessoa = result[1]
      // if (args.sexo) {
      //   pessoa.setSexo(args.sexo)
      // }
      return pessoa
    },

    /**
     * atualiza um registro de pessoa, dado o id
     */
    deletePessoa: (parent, { id }, { models }) => models.Pessoa.destroy({
      where: {
        id
      }
    })
  }
}
