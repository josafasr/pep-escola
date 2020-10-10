/**
 * @title Descritores GraphQL para os dados de indicadores de eaxme físico
 * @module src/schemas/indicadores-exame-fisico
 * @author Josafá Santos dos Reis
 */
export default `
  type IndicadoresExameFisico {
    id: ID
    peso: Int
    altura: Int
    imc: Int
    quadril: Int
    indiceCq: Int
    circunferenciaAbdomen: Int
    circunferenciaBraco: Int
    bracadeiraApropriada: String
    paSentadoMsd: Int
    paSentadoMse: Int
    paSentadoSeg: Int
    paEmPe: Int
    fr: Int
    pulso: Int
    fc: Int
    spo2: Int
    temperatura: Int
    pasDopplerMsd: Int
    pasDopplerMid: Int
    pasDopplerMie: Int
    pasDopplerMse: Int
    itb: Int
  }

  input IndicadoresExameFisicoInput {
    peso: Int
    altura: Int
    imc: Int
    quadril: Int
    indiceCq: Int
    circunferenciaAbdomen: Int
    circunferenciaBraco: Int
    bracadeiraApropriada: String
    paSentadoMsd: Int
    paSentadoMse: Int
    paSentadoSeg: Int
    paEmPe: Int
    fr: Int
    pulso: Int
    fc: Int
    spo2: Int
    temperatura: Int
    pasDopplerMsd: Int
    pasDopplerMid: Int
    pasDopplerMie: Int
    pasDopplerMse: Int
    itb: Int
  }
`