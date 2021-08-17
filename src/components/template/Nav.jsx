import './Nav.css'
import React from 'react'
import NavItem from './NavItem'

export default props =>
    <aside className='menu-area'>
        <nav className="menu">
            <NavItem path='/' icon='home' name='Início' />
            <NavItem path='/users' icon='users' name='Usuários' />
            <NavItem path='/questoes' icon='book' name='Questoes e Gabarito' />
            <NavItem path='/cursos' icon='desktop' name='Cursos' />
            <NavItem path='/crawler' icon='server' name='Crawler' />
            <NavItem path='/rendimento-alunos' icon='signal' name='Rendimento dos Alunos' />
            <NavItem path='/avaliacao-professores' icon='bullseye' name='Avaliaçáo dos Professores' />
            <NavItem path='/' icon='database' name='Banco de Dados' />
            <NavItem path='/prova' icon='envelope-open' name='Avaliacao' />
        </nav>
    </aside>