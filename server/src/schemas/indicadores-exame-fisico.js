/**
 * @title Descritores GraphQL para os dados de indicadores de eaxme físico
 * @module src/schemas/indicadores-exame-fisico
 * @author Josafá Santos dos Reis
 */
export default `
  type IndicadoresExameFisico {
    id: ID
    peso: Float
    altura: Float
    imc: Float
    quadril: Float
    indiceCq: Float
    circunferenciaAbdomen: Float
    circunferenciaBraco: Float
    bracadeiraApropriada: String
    paSentadoMsd: Float
    paSentadoMse: Float
    paSentadoSeg: Float
    paEmPe: Float
    fr: Float
    pulso: Float
    fc: Float
    spo2: Float
    temperatura: Float
    pasDopplerMsd: Float
    pasDopplerMid: Float
    pasDopplerMie: Float
    pasDopplerMse: Float
    itb: Float
  }

  input IndicadoresExameFisicoInput {
    peso: Float
    altura: Float
    imc: Float
    quadril: Float
    indiceCq: Float
    circunferenciaAbdomen: Float
    circunferenciaBraco: Float
    bracadeiraApropriada: String
    paSentadoMsd: Float
    paSentadoMse: Float
    paSentadoSeg: Float
    paEmPe: Float
    fr: Float
    pulso: Float
    fc: Float
    spo2: Float
    temperatura: Float
    pasDopplerMsd: Float
    pasDopplerMid: Float
    pasDopplerMie: Float
    pasDopplerMse: Float
    itb: Float
  }
`