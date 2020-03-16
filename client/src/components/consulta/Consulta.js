/**
 * Componente para preenchimento de consultas
 * @author Josafá Santos
 */

import React from 'react'
import {
  TextField,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'

import './Consulta.css'

class Consulta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomePaciente: '',
      dataAvaliacao: '',
      queixaPrincipal: '',
      historiaDoencaAtual: '',
      comorbidades: true,
      antecedentes: {
        dislipidemia: false,
        obesidade: false
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAntecedentesChange = this.handleAntecedentesChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    // if (target.name !== 'comorbidades') {
    //   this.setState((state, target) => ({
    //     antecedentes: state.antecedentes.push(target.name)
    //   }))
    //   console.log(this.state.antecedentes)
    // } else {
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      })
    // }
  }

  handleAntecedentesChange(event) {
    const target = event.target
    // const name = target.name
    this.setState({
      [event.target.checked]: target.checked
    })
  }

  render() {
    return (
      <form className="form-consulta">
        <TextField
          className="form-field full-width"
          name="nomePaciente"
          label="Nome"
          value={this.state.nomePaciente}
          onChange={this.handleInputChange} />

        <TextField
          className="form-field full-width"
          name="queixaPrincipal"
          label="Queixa Principal"
          value={this.state.queixaPrincipal}
          onChange={this.handleInputChange} />

        <TextField
          className="form-field full-width"
          name="historiaDoencaAtual"
          label="História da Doença Atual"
          multiline
          rows="4"
          variant="filled"
          value={this.state.historiaDoencaAtual}
          onChange={this.handleInputChange} />

        <fieldset className="form-field full-width">
          <legend>Antecedentes Patológicos</legend>
            <FormControlLabel
              name="comorbidades"
              value={this.state.comorbidades}
              control={<Checkbox size="small" />}
              label="Presença de comorbidades"
              labelPlacement="end"
              onChange={this.handleInputChange}
            />

            <FormControlLabel
              control={<Checkbox name="dislipidemia" checked={this.state.antecedentes.dislipidemia} size="small" />}
              label="Dislipidemia"
              labelPlacement="end"
              onChange={this.handleInputChange}
            />

            <FormControlLabel
              control={<Checkbox name="obesidade" checked={this.state.antecedentes.obesidade} size="small" />}
              label="Obesidade"
              labelPlacement="end"
              onChange={this.handleInputChange}
            />
        </fieldset>
      </form>
    )
  }
}

export default Consulta
