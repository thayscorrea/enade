import React from 'react'
import Main from '../template/Main'
import axios from 'axios'

import { NotificationManager } from 'react-notifications'
import QuestoesGabaritoform from './Cursosform'
import QuestoesGabaritoTable from './CursosTable'

const headerProps = {
    icon: 'desktop',
    title: 'Cursos',
    subtitle: 'Cadastro de Cursos: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3000/cursos'

const initialState = {
    cursos: {
        name: ''
    },
    list: []
}

export default class CursosCrud extends React.Component {

    constructor() {
        super()

        this.state = { ...initialState }

        this.clear = this.clear.bind(this)
        this.save = this.save.bind(this)
        this.getUpdatedList = this.getUpdatedList.bind(this)
        this.updateField = this.updateField.bind(this)
        this.load = this.load.bind(this)
        this.remove = this.remove.bind(this)
        this.handleEnterPress = this.handleEnterPress.bind(this)
    }

    componentWillMount() {
        axios.get(baseUrl).then(response => {
            this.setState({ list: response.data })
        })
    }

    handleEnterPress(event) {
        if (event.key === 'Enter') {
            this.save()
        }
    }

    clear() {
        this.setState({ cursos: initialState.cursos })
    }

    save() {
        const cursos = this.state.cursos
        const method = cursos.id ? 'put' : 'post'
        const url = cursos.id ? `${baseUrl}/${cursos.id}` : baseUrl

        if (cursos.name === '' ) {
            NotificationManager.warning('Nome obrigatório', 'Preencha os campos')
        } else {
            axios[method](url, cursos)
                .then(response => {
                    const list = this.getUpdatedList(response.data)
                    this.setState({ cursos: initialState.cursos, list })
                    if (method === 'post')
                        NotificationManager.success('Curso criado com sucesso', 'Criar Curso')
                    else
                        NotificationManager.success('Curso alterado com sucesso', 'Editar Curso')
                })
        }

    }

    getUpdatedList(cursos, add = true) {
        const list = this.state.list.filter(u => u.id !== cursos.id)
        if (add)
            list.unshift(cursos)
        return list
    }

    updateField(event) {
        const cursos = { ...this.state.cursos }
        cursos[event.target.name] = event.target.value
        this.setState({ cursos })
    }

    load(cursos) {
        this.setState({ cursos })
    }

    remove(cursos) {
        axios.delete(`${baseUrl}/${cursos.id}`)
            .then(response => {
                const list = this.getUpdatedList(cursos, false)
                this.setState({ list })
                NotificationManager.success('Curso excluído com sucesso', 'Curso Usuário')
            })
    }

    render() {
        return (
            <Main {...headerProps}>
                <QuestoesGabaritoform name={this.state.cursos.name}
                    clear={this.clear}
                    save={this.save}
                    updateField={this.updateField}
                    handleEnterPress={this.handleEnterPress}
                />
                <QuestoesGabaritoTable list={this.state.list}
                    load={this.load}
                    remove={this.remove}
                />
            </Main>
        )
    }
}