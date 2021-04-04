/**
 * @title Mapeamento da tabela de avaliação de atendimento
 * @module src/models/AvaliacaoAtendimento
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const AvaliacaoAtendimento = sequelize.define('AvaliacaoAtendimento', {
    nota: DataTypes.DECIMAL,
    consultaId: {
      type: DataTypes.INTEGER,
      field: 'consulta_id'
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      field: 'usuario_id'
    }
  }, {
    schema: 'ceuas',
    tableName: 'avaliacao_atendimento'
  })

  AvaliacaoAtendimento.associate = (models) => {
    /**
     * Relacionamento com a tabela de consultas
     * @see module:src/models/Consulta
     */
    AvaliacaoAtendimento.belongsTo(models.Consulta, {
      as: 'consulta',
      foreignKey: 'consultaId'
    }),
    
    /**
     * Relacionamento com a tabela de usuários
     * @see module:src/models/Usuario
     */
    AvaliacaoAtendimento.belongsTo(models.Usuario, {
      as: 'avaliador',
      foreignKey: 'usuarioId'
    })
  }

  return AvaliacaoAtendimento
}
