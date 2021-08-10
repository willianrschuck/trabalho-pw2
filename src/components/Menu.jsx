import React, { Component, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Container } from 'semantic-ui-react'
import { logout } from '../services/auth'
import { getPeriodosLetivos } from '../api/suap'
import './Menu.css';

const MenuPrincipal = ({token, setToken, config, setConfig}) => {

  const [periodos, setPeriodos] = useState([]);

  const setPeriodo = (p) => {
    console.log(p)
    setConfig({...Component, periodo: {
      ano: p.ano_letivo,
      periodo: p.periodo_letivo
    }});
  }

  useEffect(() => {
    getPeriodosLetivos().then(
      (res) => {
        setPeriodos(res.data)
      },
      _ => {}
    )
  }, [token])

  return (
    //large secondary inverted pointing
    <Menu secondary stackable className='following bar light'>
      <Container id='navbar'>
        <Menu.Item header>Trabalho de PW</Menu.Item>
        <Menu.Item as={NavLink}
          exact to='/'
          name='home'
        />
        <Menu.Item as={NavLink}
          exact to='turmas'
          name='turmas virtuais'
        />
        {token && 
        <Menu.Item as={NavLink}
          exact to='/tarefa/cadastro'
          name='Manutenção Tarefas'
        />}

        <Menu.Menu position='right'>
          {token ?
            <>
              <Dropdown item text={`Período${config.periodo ? ': ' + config.periodo.ano + '/' + config.periodo.periodo : ''}`}>
                <Dropdown.Menu>
                  {periodos && periodos.map(p => 
                    <Dropdown.Item onClick={() => setPeriodo(p)}>{`${p.ano_letivo}/${p.periodo_letivo}`}</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item as={Link}
                name='logout'
                icon='unlock'
                to='/'
                onClick={() => logout(setToken)}
              />
            </>
          :
            <Menu.Item as={NavLink}
              exact to='login'
              icon='lock'
              name='login'
            />
          }
        </Menu.Menu>
      </Container>
    </Menu>
  )

}

export default MenuPrincipal;