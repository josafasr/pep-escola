/**
 * @description Formulário para criação/edição dos dados de indicativos de exame físico
 * @module src/forms/IndicadoresExameFisicoForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import {
  makeStyles,
  TextField,
  InputAdornment,
  FormControl,
  FormLabel,
  FormGroup
} from '@material-ui/core'

import ConsultaContext from '../contexts/ConsultaContext'

const useStyles = makeStyles((theme) => ({
  fields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    }
  },

  formFields: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1, 2, 0, 0)
    }
    /* Chrome, Safari, Edge, Opera */
    // '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
      //'-webkit-appearance': 'none',
      //WebkitAppearance: 'none',
      //margin: 0
    //},

    /* Firefox */
    //'& input[type=number]': {
      //appearance: 'textfield'
    //}
  },

  formControl: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },

  formLabel: {
    paddingRight: '10px',
    fontWeight: 'bold',
    marginTop: '25px'
  },

  formGroup: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },

  adornment: {
    '& p': {
      fontSize: 'small'
    }
  }
}))

function IndicadoresExameFisicoForm(props, ref) {
  const classes = useStyles()
  const { disabled } = props
  const [consulta, setConsulta] = React.useContext(ConsultaContext)

  const handleChange = event => {
    if (event.target.value) {
      const { name, value } = event.target
      setConsulta({
        ...consulta,
        indicadoresExameFisico: {
          ...consulta.indicadoresExameFisico,
          [name]: ['bracadeiraApropriada'].includes(name) ? value : Number(value.replace(',', '.'))
        }
      })
    }
  }

  const handleReset = () => {
    setConsulta({})
  }

  /**
   * Possibilita, ao component pai,
   * acesso a métodos deste component
   */
  React.useImperativeHandle(ref, () => ({
    handleReset: () => {
      handleReset()
    }/* ,
    handleChange: () => {
      handleChange()
    } */
  }))

  return disabled && !consulta.indicadoresExameFisico ? (
    undefined
    ) : (<div className={classes.fields}>
      <TextField
        className={classes.formFields}
        name="peso"
        defaultValue={consulta.indicadoresExameFisico?.peso}
        onBlur={handleChange}
        label="Peso"
        size="small"
        InputProps={{
          readOnly: disabled,
          endAdornment: <InputAdornment
            classes={{ root: classes.adornment }}
            position="end">Kg</InputAdornment>
        }}
      />

      <TextField
        className={classes.formFields}
        name="altura"
        defaultValue={consulta.indicadoresExameFisico?.altura}
        onBlur={handleChange}
        label="Altura"
        size="small"
        InputProps={{
          readOnly: disabled,
          endAdornment: <InputAdornment
            classes={{ root: classes.adornment }}
            position="end">m</InputAdornment>
        }}
      />

      <TextField
        className={classes.formFields}
        name="imc"
        defaultValue={consulta.indicadoresExameFisico?.imc}
        onBlur={handleChange}
        label="IMC"
        size="small"
        InputProps={{
          readOnly: disabled,
          endAdornment: <InputAdornment
            classes={{ root: classes.adornment }}
            position="end">Kg/m²</InputAdornment>
        }}
      />

      <TextField
        className={classes.formFields}
        name="quadril"
        defaultValue={consulta.indicadoresExameFisico?.quadril}
        onBlur={handleChange}
        label="Quadril"
        size="small"
        InputProps={{
          readOnly: disabled,
          endAdornment: <InputAdornment
            classes={{ root: classes.adornment }}
            position="end">cm</InputAdornment>
        }}
      />

      <TextField
        className={classes.formFields}
        name="indiceCq"
        defaultValue={consulta.indicadoresExameFisico?.indiceCq}
        onBlur={handleChange}
        label="Índice C/Q"
        size="small"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="circunferenciaAbdomen"
        defaultValue={consulta.indicadoresExameFisico?.circunferenciaAbdomen}
        onBlur={handleChange}
        label="Circunferência Abdominal"
        size="small"
        InputProps={{
          readOnly: disabled,
          endAdornment: <InputAdornment
            classes={{ root: classes.adornment }}
            position="end">cm</InputAdornment>
        }}
      />

      <TextField
        className={classes.formFields}
        name="circunferenciaBraco"
        defaultValue={consulta.indicadoresExameFisico?.circunferenciaBraco}
        onBlur={handleChange}
        label="Circunferencia do Braço"
        size="small"
        InputProps={{
          readOnly: disabled,
          endAdornment: <InputAdornment
            classes={{ root: classes.adornment }}
            position="end">cm</InputAdornment>
        }}
      />

      <TextField
        className={classes.formFields}
        name="bracadeiraApropriada"
        defaultValue={consulta.indicadoresExameFisico?.bracadeiraApropriada}
        onBlur={handleChange}
        label="Braçadeira Apropriada"
        size="small"
        inputProps={{
          readOnly: disabled
        }}
      />

      {/* PA Sentado: */}
      <FormControl className={classes.formControl}>
        <FormLabel className={classes.formLabel} component="legend">PA Sentado:</FormLabel>
        <FormGroup className={classes.formGroup}>
          <TextField
            className={classes.formFields}
            name="paSentadoMsd"
            defaultValue={consulta.indicadoresExameFisico?.paSentadoMsd}
            onBlur={handleChange}
            label="MSD"
            size="small"
            InputProps={{
              readOnly: disabled,
              endAdornment: <InputAdornment
                classes={{ root: classes.adornment }}
                position="end">mmHg</InputAdornment>
            }}
          />

          <TextField
            className={classes.formFields}
            name="paSentadoMse"
            defaultValue={consulta.indicadoresExameFisico?.paSentadoMse}
            onBlur={handleChange}
            label="MSE"
            size="small"
            InputProps={{
              readOnly: disabled,
              endAdornment: <InputAdornment
                classes={{ root: classes.adornment }}
                position="end">mmHg</InputAdornment>
            }}
          />

          <TextField
            className={classes.formFields}
            name="paSentadoSeg"
            defaultValue={consulta.indicadoresExameFisico?.paSentadoSeg}
            onBlur={handleChange}
            label="2ª medida"
            helperText="considerar o braço com a maior PA"
            size="small"
            InputProps={{
              readOnly: disabled,
              endAdornment: <InputAdornment
                classes={{ root: classes.adornment }}
                position="end">mmHg</InputAdornment>
            }}
          />
        </FormGroup>
      </FormControl>

      <TextField
        className={classes.formFields}
        name="paEmPe"
        defaultValue={consulta.indicadoresExameFisico?.paEmPe}
        onBlur={handleChange}
        label="PA em pé (3min)"
        size="small"
        InputProps={{
          readOnly: disabled,
          endAdornment: <InputAdornment
            classes={{ root: classes.adornment }}
            position="end">mmHg</InputAdornment>
        }}
      />

      <TextField
        className={classes.formFields}
        name="fr"
        defaultValue={consulta.indicadoresExameFisico?.fr}
        onBlur={handleChange}
        label="FR"
        size="small"
        InputProps={{
          readOnly: disabled,
          endAdornment: <InputAdornment
            classes={{ root: classes.adornment }}
            position="end">rpm</InputAdornment>
        }}
      />

      <TextField
        className={classes.formFields}
        name="pulso"
        defaultValue={consulta.indicadoresExameFisico?.pulso}
        onBlur={handleChange}
        label="Pulso"
        size="small"
        InputProps={{
          readOnly: disabled,
          endAdornment: <InputAdornment
            classes={{ root: classes.adornment }}
            position="end">bpm</InputAdornment>
        }}
      />

      <TextField
        className={classes.formFields}
        name="fc"
        defaultValue={consulta.indicadoresExameFisico?.fc}
        onBlur={handleChange}
        label="FC"
        size="small"
        InputProps={{
          readOnly: disabled,
          endAdornment: <InputAdornment
            classes={{ root: classes.adornment }}
            position="end">bpm</InputAdornment>
        }}
      />

      <TextField
        className={classes.formFields}
        name="spo2"
        defaultValue={consulta.indicadoresExameFisico?.spo2}
        onBlur={handleChange}
        label="SpO2"
        size="small"
        InputProps={{
          readOnly: disabled,
          endAdornment: <InputAdornment
            classes={{ root: classes.adornment }}
            position="end">%</InputAdornment>
        }}
      />

      <TextField
        className={classes.formFields}
        name="temperatura"
        defaultValue={consulta.indicadoresExameFisico?.temperatura}
        onBlur={handleChange}
        label="Temperatura"
        size="small"
        InputProps={{
          readOnly: disabled,
          endAdornment: <InputAdornment
            classes={{ root: classes.adornment }}
            position="end">ºC</InputAdornment>
        }}
      />

      <FormControl className={classes.formControl}>
        <FormLabel className={classes.formLabel} component="legend">PAS Doppler:</FormLabel>
        <FormGroup className={classes.formGroup}>
          <TextField
            className={classes.formFields}
            name="pasDopplerMsd"
            defaultValue={consulta.indicadoresExameFisico?.pasDopplerMsd}
            onBlur={handleChange}
            label="MSD"
            size="small"
            InputProps={{
              readOnly: disabled
            }}
          />

          <TextField
            className={classes.formFields}
            name="pasDopplerMid"
            defaultValue={consulta.indicadoresExameFisico?.pasDopplerMid}
            onBlur={handleChange}
            label="MID"
            size="small"
            inputProps={{
              readOnly: disabled
            }}
          />

          <TextField
            className={classes.formFields}
            name="pasDopplerMie"
            defaultValue={consulta.indicadoresExameFisico?.pasDopplerMie}
            onBlur={handleChange}
            label="MIE"
            size="small"
            inputProps={{
              readOnly: disabled
            }}
          />

          <TextField
            className={classes.formFields}
            name="pasDopplerMse"
            defaultValue={consulta.indicadoresExameFisico?.pasDopplerMse}
            onBlur={handleChange}
            label="MSE"
            size="small"
            inputProps={{
              readOnly: disabled
            }}
          />
        </FormGroup>
      </FormControl>

      <TextField
        className={classes.formFields}
        name="itb"
        defaultValue={consulta.indicadoresExameFisico?.itb}
        onBlur={handleChange}
        label="ITB"
        size="small"
        inputProps={{
          readOnly: disabled
        }}
      />
    </div>
  )
}
export default React.forwardRef(IndicadoresExameFisicoForm)