import React from 'react'
import Main from '../template/Main'
import axios from 'axios'

import { NotificationManager } from 'react-notifications'
import Provaform from './Provaform'
import ProvaTable from './ProvaTable'

const headerProps = {
    icon: 'envelope-open',
    title: 'Avaliação',
    subtitle: 'Cadastro de avaliações: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3000/prova'

const initialState = {
    prova: {
        data: '',
        cursos: [],
        num_questoes: 0
    },
    list: []
}

export default class ProvaCrud extends React.Component {

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
        this.setState({ prova: initialState.prova })
    }

    save() {
        const prova = this.state.prova
        const method = prova.id ? 'put' : 'post'
        const url = prova.id ? `${baseUrl}/${prova.id}` : baseUrl

        if (prova.name === '' ) {
            NotificationManager.warning('Nome obrigatório', 'Preencha os campos')
        } else {
            axios[method](url, prova)
                .then(response => {
                    const list = this.getUpdatedList(response.data)
                    this.setState({ prova: initialState.prova, list })
                    if (method === 'post')
                        NotificationManager.success('Curso criado com sucesso', 'Criar Curso')
                    else
                        NotificationManager.success('Curso alterado com sucesso', 'Editar Curso')
                })
        }

    }

    getUpdatedList(prova, add = true) {
        const list = this.state.list.filter(u => u.id !== prova.id)
        if (add)
            list.unshift(prova)
        return list
    }

    updateField(event) {
        const prova = { ...this.state.prova }
        prova[event.target.name] = event.target.value
        this.setState({ prova })
    }

    load(prova) {
        this.setState({ prova })
    }

    remove(prova) {
        axios.delete(`${baseUrl}/${prova.id}`)
            .then(response => {
                const list = this.getUpdatedList(prova, false)
                this.setState({ list })
                NotificationManager.success('Curso excluído com sucesso', 'Curso Usuário')
            })
    }

    render() {
        return (
            <Main {...headerProps}>
                <Provaform prova={this.state.prova.cursos}
                    clear={this.clear}
                    save={this.save}
                    updateField={this.updateField}
                    handleEnterPress={this.handleEnterPress}
                />
                <ProvaTable list={this.state.list}
                    load={this.load}
                    remove={this.remove}
                />
            </Main>
        )
    }
}