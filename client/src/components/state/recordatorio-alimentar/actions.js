import {
  CREATE_OPTION,
  SELECT_OPTION,
  REMOVE_OPTION,
  SET_OPTIONS,
  SET_OPEN,
  SET_INPUT_VALUE,
  SET_REASON,
  SET_SEARCH_TEXT,
  SET_TARGET_ID,
  SET_TIPOS_REFEICAO,
  GET_ALIMENTOS_BY_TEXT
} from './types'

export const createOption = (nomeAlimento, tipoRefeicao) => {
  return {
    type: CREATE_OPTION,
    payload: { nomeAlimento, tipoRefeicao }
  }
}

export const selectOption = (alimento, tipoRefeicao) => {
  return {
    type: SELECT_OPTION,
    payload: { alimento, tipoRefeicao }
  }
}

export const removeOption = (option) => {
  return {
    type: REMOVE_OPTION,
    payload: { option }
  }
}

export const setOptions = (options) => {
  return {
    type: SET_OPTIONS,
    payload: { options }
  }
}

export const setOpen = (open) => {
  return {
    type: SET_OPEN,
    payload: { open }
  }
}

export const setInputValue = (name, value) => {
  return {
    type: SET_INPUT_VALUE,
    payload: { name, value }
  }
}

export const setReason = (reason) => {
  return {
    type: SET_REASON,
    payload: { reason }
  }
}

export const setSearchText = (searchText) => {
  return {
    type: SET_SEARCH_TEXT,
    payload: { searchText }
  }
}

export const setTargetId = (id) => {
  return {
    type: SET_TARGET_ID,
    payload: { id }
  }
}

export const setTiposRefeicao = () => {
  return {
    type: SET_TIPOS_REFEICAO
  }
}

export const getAlimentosByText = (searchText) => {
  return {
    type: GET_ALIMENTOS_BY_TEXT,
    payload: { searchText}
  }
}