/**
 * Componente para exibição de links para os módulos do sistema, na página Home
 * @author Josafá Santos
 */

import React from 'react'
import { Link } from 'react-router-dom'
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography
} from '@material-ui/core'

import './Space.css'

function Space(props) {
  const imageLink = props.imageLink
  const link = props.link
  const name = props.name

  return (
    <Link className="space-link" to={ link }>
      <Card className="space-card">
        <CardActionArea className="card-action">
          <CardMedia className="space-image" image={ imageLink } />
          <CardContent className="card-content">
            <Typography variant="h6">{ name }</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default Space