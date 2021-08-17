import React from 'react'
import Main from '../template/Main'
import axios from 'axios'

import { NotificationManager } from 'react-notifications'
import Crawlerform from './Crawlerform'
import CrawlerTable from './CrawlerTable'

const headerProps = {
    icon: 'server',
    title: 'Crawler',
    subtitle: 'Executar o Crawler: Obter as questoes do ENADE'
}

const baseUrl = 'http://localhost:3000/crawler'

const initialState = {
    provas: {
        ano: '',
        enunciado: '',
        alternativas: '',
        alternativa_correta: ''
    },
    list: []
}

export default class CrawlerCrud extends React.Component {

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
        this.setState({ provas: initialState.provas })
    }

    save() {
        const provas = this.state.provas
        const method = provas.id ? 'put' : 'post'
        const url = provas.id ? `${baseUrl}/${provas.id}` : baseUrl

        if (provas.ano === '' || provas.enunciado === '' || provas.alternativas === '' || provas.alternativa_correta === '') {
            NotificationManager.warning('Ano, Enunciado, Alternativas e Alternativa Correta obrigatórios', 'Preencha os campos')
        } else {
            axios[method](url, provas)
                .then(response => {
                    const list = this.getUpdatedList(response.data)
                    this.setState({ provas: initialState.provas, list })
                    if (method === 'post')
                        NotificationManager.success('Questao criado com sucesso', 'Criar Questao')
                    else
                        NotificationManager.success('Questao alterado com sucesso', 'Editar Questao')
                })
        }

    }

    getUpdatedList(provas, add = true) {
        const list = this.state.list.filter(u => u.id !== provas.id)
        if (add)
            list.unshift(provas)
        return list
    }

    updateField(event) {
        const provas = { ...this.state.provas }
        provas[event.target.name] = event.target.value
        this.setState({ provas })
    }

    load(provas) {
        this.setState({ provas })
    }

    remove(provas) {
        axios.delete(`${baseUrl}/${provas.id}`)
            .then(response => {
                const list = this.getUpdatedList(provas, false)
                this.setState({ list })
                NotificationManager.success('Questao excluída com sucesso', 'Exclusao Questao')
            })
    }

    render() {
        return (
            <Main {...headerProps}>
                <Crawlerform ano={this.state.provas.ano}
                    enunciado={this.state.provas.enunciado}
                    alternativas={this.state.provas.alternativas}
                    alternativa_correta={this.state.provas.alternativa_correta}
                    clear={this.clear}
                    save={this.save}
                    updateField={this.updateField}
                    handleEnterPress={this.handleEnterPress}
                />
                <CrawlerTable list={this.state.list}
                    load={this.load}
                    remove={this.remove}
                />
            </Main>
        )
    }
}