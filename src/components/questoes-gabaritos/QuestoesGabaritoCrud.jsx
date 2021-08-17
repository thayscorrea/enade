import React from 'react'
import Main from '../template/Main'
import axios from 'axios'

import { NotificationManager } from 'react-notifications'
import QuestoesGabaritoform from './QuestoesGabaritoform'
import QuestoesGabaritoTable from './QuestoesGabaritoTable'

const headerProps = {
    icon: 'book',
    title: 'Questoes e Gabarito',
    subtitle: 'Cadastro de Questoes e Alternativas: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3000/questoes'

const initialState = {
    questao_gabarito: {
        enunciado: '',
        alternativaA: '',
        alternativaB: '',
        alternativaC: '',
        alternativaD: '',
        alternativaE: ''
    },
    list: []
}

export default class QuestoesGabaritoCrud extends React.Component {

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
        this.setState({ questao_gabarito: initialState.questao_gabarito })
    }

    save() {
        const questao_gabarito = this.state.questao_gabarito
        const method = questao_gabarito.id ? 'put' : 'post'
        const url = questao_gabarito.id ? `${baseUrl}/${questao_gabarito.id}` : baseUrl

        if (questao_gabarito.enunciado === '' || questao_gabarito.alternativaA === '' || questao_gabarito.alternativaB === '' || questao_gabarito.alternativaC === '' || questao_gabarito.alternativaD === '' || questao_gabarito.alternativaE === '') {
            NotificationManager.warning('Enunciado e alternativas obrigatórios', 'Preencha os campos')
        } else {
            axios[method](url, questao_gabarito)
                .then(response => {
                    const list = this.getUpdatedList(response.data)
                    this.setState({ questao_gabarito: initialState.questao_gabarito, list })
                    if (method === 'post')
                        NotificationManager.success('Questao criado com sucesso', 'Criar Questao')
                    else
                        NotificationManager.success('Questao alterado com sucesso', 'Editar Questao')
                })
        }

    }

    getUpdatedList(questao_gabarito, add = true) {
        const list = this.state.list.filter(u => u.id !== questao_gabarito.id)
        if (add)
            list.unshift(questao_gabarito)
        return list
    }

    updateField(event) {
        const questao_gabarito = { ...this.state.questao_gabarito }
        questao_gabarito[event.target.name] = event.target.value
        this.setState({ questao_gabarito })
    }

    load(questao_gabarito) {
        this.setState({ questao_gabarito })
    }

    remove(questao_gabarito) {
        axios.delete(`${baseUrl}/${questao_gabarito.id}`)
            .then(response => {
                const list = this.getUpdatedList(questao_gabarito, false)
                this.setState({ list })
                NotificationManager.success('Usuário excluído com sucesso', 'Excluir Usuário')
            })
    }

    render() {
        return (
            <Main {...headerProps}>
                <QuestoesGabaritoform enunciado={this.state.questao_gabarito.enunciado}
                    alternativaA={this.state.questao_gabarito.alternativaA}
                    alternativaB={this.state.questao_gabarito.alternativaB}
                    alternativaC={this.state.questao_gabarito.alternativaC}
                    alternativaD={this.state.questao_gabarito.alternativaD}
                    alternativaE={this.state.questao_gabarito.alternativaE}
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