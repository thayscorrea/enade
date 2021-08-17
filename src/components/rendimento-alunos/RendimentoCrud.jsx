import React from 'react'
import Main from '../template/Main'
import axios from 'axios'

import { NotificationManager } from 'react-notifications'
import QuestoesGabaritoform from './Rendimentoform'
import QuestoesGabaritoTable from './RendimentoTable'

const headerProps = {
    icon: 'signal',
    title: 'Redimento dos Alunos',
    subtitle: 'Cadastro de Rendimento dos Alunos: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3000/rendimento-alunos'

const initialState = {
    rendimentoAlunos: {
        aluno: '',
        rendimentos: ''
    },
    list: []
}

export default class RendimentoCrud extends React.Component {

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
        this.setState({ rendimentoAlunos: initialState.rendimentoAlunos })
    }

    save() {
        const rendimentoAlunos = this.state.rendimentoAlunos
        const method = rendimentoAlunos.id ? 'put' : 'post'
        const url = rendimentoAlunos.id ? `${baseUrl}/${rendimentoAlunos.id}` : baseUrl

        if (rendimentoAlunos.aluno === '' || rendimentoAlunos.rendimento === '') {
            NotificationManager.warning('Aluno e Rendimento obrigatórios', 'Preencha os campos')
        } else {
            axios[method](url, rendimentoAlunos)
                .then(response => {
                    const list = this.getUpdatedList(response.data)
                    this.setState({ rendimentoAlunos: initialState.rendimentoAlunos, list })
                    if (method === 'post')
                        NotificationManager.success('Rendimento de aluno criado com sucesso', 'Criar Rendimento de aluno')
                    else
                        NotificationManager.success('Rendimento de aluno alterado com sucesso', 'Editar Rendimento de aluno')
                })
        }

    }

    getUpdatedList(rendimentoAlunos, add = true) {
        const list = this.state.list.filter(u => u.id !== rendimentoAlunos.id)
        if (add)
            list.unshift(rendimentoAlunos)
        return list
    }

    updateField(event) {
        const rendimentoAlunos = { ...this.state.rendimentoAlunos }
        rendimentoAlunos[event.target.name] = event.target.value
        this.setState({ rendimentoAlunos })
    }

    load(rendimentoAlunos) {
        this.setState({ rendimentoAlunos })
    }

    remove(rendimentoAlunos) {
        axios.delete(`${baseUrl}/${rendimentoAlunos.id}`)
            .then(response => {
                const list = this.getUpdatedList(rendimentoAlunos, false)
                this.setState({ list })
                NotificationManager.success('Rendimento de aluno excluído com sucesso', 'Exclusao de rendimento de aluno')
            })
    }

    render() {
        return (
            <Main {...headerProps}>
                <QuestoesGabaritoform aluno={this.state.rendimentoAlunos.aluno}
                    rendimento={this.state.rendimentoAlunos.rendimento}
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