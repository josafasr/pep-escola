/**
 * @file Operações sobre a tabela de apresentações de especialidade
 * @module resolvers/especialidade
 * @author Marcos Porto 
 */

const formatErrors = (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    return e.errors.map((x) => _.pick(x, ['path', 'message']))
  }
  return [{ path: 'erro', message: 'Algo deu errado!' }]
}

export default {
   Query: {

       /**
        * retorna todos os registros de especialidade
        */
       especialidades: (parent, args, { models }) => models.Especialidade.findAll(),
  
       /**
        * restorna um registro de especialidade
        */
       especialidade: (parent, { id }, { models }) => models.Especialidade.findByPk(id)
      },

    Mutation: {

      /**
       * cria um novo registro de especialidade
       */

      createEspecialidade: async (parent, args, { models }) => {
        try {
          const especialidade = await models.Especialidade.create({
            nome: args.nome,
              descricao: args.descricao,
              createdAt: new Date(),
              updatedAt: new Date()
          })
          return {
            ok: true,
            especialidade
          }
        } catch (err) {
          return {
            ok: false,
            errors: formatErrors(err, models)
            }
        }
        
      },
      /**
       * atualiza um registro de especialidade, dado o id
       */
      updateEspecialidade: (parent, args, {models}) => models.Especialidade.update({
          nome: args.nome,
          descricao: args.descricao,
          updatedAt: new Date()
      }, {
          where: {
              id: args.id
          },
          returning: true,
          plain: true
        }).then((result) => { result[1] }),
  
      /**
       * exclui um registro de especialidade, dado o id
       */
      deleteEspecialidade: (parent, { id }, { models }) => models.Especialidade.destroy({
        where: {
          id
        }
      })
    }  
};
