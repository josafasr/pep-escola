/**
 * @description Mapeamento da tabela de indicadores exame físico
 * @module src/models/IndicadoresExameFisico
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const IndicadoresExameFisico = sequelize.define('IndicadoresExameFisico', {
    peso: DataTypes.DECIMAL,
    altura: DataTypes.DECIMAL,
    imc: DataTypes.DECIMAL,
    quadril: DataTypes.DECIMAL,
    indiceCq: {
      type: DataTypes.DECIMAL,
      field: 'indice_cq'
    },
    circunferenciaAbdomen: {
      type: DataTypes.DECIMAL,
      field: 'circunferencia_abdomen'
    },
    circunferenciaBraco: {
      type: DataTypes.DECIMAL,
      field: 'circunferencia_braco'
    },
    bracadeiraApropriada: {
      type: DataTypes.STRING,
      field: 'bracadeira_apropriada'
    },
    paSentadoMsd: {
      type: DataTypes.DECIMAL,
      field: 'pa_sentado_msd'
    },
    paSentadoMse: {
      type: DataTypes.DECIMAL,
      field: 'pa_sentado_mse'
    },
    paSentadoSeg: {
      type: DataTypes.DECIMAL,
      field: 'pa_sentado_seg'
    },
    paEmPe: {
      type: DataTypes.DECIMAL,
      field: 'pa_em_pe'
    },
    fr: DataTypes.INTEGER,
    pulso: DataTypes.INTEGER,
    fc: DataTypes.INTEGER,
    spo2: DataTypes.DECIMAL,
    temperatura: DataTypes.DECIMAL,
    pasDopplerMsd: {
      type: DataTypes.DECIMAL,
      field: 'pas_doppler_msd'
    },
    pasDopplerMid: {
      type: DataTypes.DECIMAL,
      field: 'pas_doppler_mid'
    },
    pasDopplerMie: {
      type: DataTypes.DECIMAL,
      field: 'pas_doppler_mie'
    },
    pasDopplerMse: {
      type: DataTypes.DECIMAL,
      field: 'pas_doppler_mse'
    },
    itb: DataTypes.DECIMAL,
    consultaId: {
      type: DataTypes.UUID,
      field: 'consulta_id'
    }
  }, {
    tableName: 'ceuas_indicadores_exame_fisico',
    timestamps: false
  })

  IndicadoresExameFisico.associate = (models) => {
    /**
     * Relacionamento com a tabela de consultas
     * @see module:src/models/Consulta
     */
    IndicadoresExameFisico.belongsTo(models.Consulta, {
      as: 'consulta',
      foreignKey: 'consulta_id'
    })
  }

  return IndicadoresExameFisico
}
