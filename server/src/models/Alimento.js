/**
 * @file Mapeamento da tabela de tipos de refeição
 * @module src/models/Alimento
 * @author Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
  const Alimento = sequelize.define('Alimento', {

    nome: DataTypes.STRING
    
  }, {
    schema: 'ceuas',
    tableName: 'alimento'
  });

  Alimento.associate = (models) => {
    /**
    * Relacionamento com a tabela de recordatório alimentar 
    * @see module:models/RecordatorioAlimentar
    */
    Alimento.hasMany(models.RecordatorioAlimentar, {
      as: 'recordatorioAlimentar',
      foreignKey: 'alimentoId'
    })
  }
  return Alimento
}