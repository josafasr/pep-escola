/**
 * Componente da página inicial da aplicação
 * @author Josafá Santos
 */

import React from 'react'

import './Home.css'
import Space from '../space'

function Home() {
  return (
    <div className="home">
      <Space link="/agenda" imageLink="/images/agenda.png" name="Agenda" />
      <Space link="/consulta" imageLink="/images/prancheta.png" name="Consultas" />
      <Space link="/cadastro" imageLink="/images/pagina.png" name="Cadastro" />
    </div>
  )
}

export default Home