/**
 * @description Mapeamento da tabela de complemento do exame físico na consulta
 * @module src/models/ComplementoConsultaAntecedente
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
    const ComplementoConsultaAntecedente = sequelize.define('ComplementoConsultaAntecedente', {
      complemento: DataTypes.TEXT,
      consultaId: {
        type: DataTypes.UUID,
        field: 'consulta_id'
      },
      tipoAntecedenteId: {
        type: DataTypes.INTEGER,
        field: 'tipo_antecedente_id'
      }
    }, {
      tableName: 'ceuas_complemento_consulta_antecedente',
      timestamps: false
    })

    ComplementoConsultaAntecedente.associate = (models) => {
      /**
       * Relacionamento com a tabela de consultas
       * @see module: src/models/Consulta
       */
      ComplementoConsultaAntecedente.belongsTo(models.Consulta, {
        as: 'consulta',
        foreignKey: 'consultaId'
      }),

      /**
       * Relacionamento com a tabela de tipos de antecedentes
       * @see module: src/models/TipoAntecedente
       */
       ComplementoConsultaAntecedente.belongsTo(models.TipoAntecedente, {
        as: 'tipoAntecedente',
        foreignKey: 'tipoAntecedenteId'
      })
    }
    
    return ComplementoConsultaAntecedente
  }
