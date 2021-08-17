import React from 'react'
import Main from '../template/Main'
import axios from 'axios'
import api from '../../services/api'

import { NotificationManager } from 'react-notifications'
import AvalicaoProfessoresform from './AvalicaoProfessoresform'
import AvalicaoProfessoresTable from './AvalicaoProfessoresTable'

const headerProps = {
    icon: 'bullseye',
    title: 'Avaliação dos Professores',
    subtitle: 'Cadastro de avaliação: Incluir, Listar, Alterar e Excluir'
}

const initialState = {
    avaliacaoProfessores: {
        professores: [],
        avaliacao: []
    },
    list: []
}

export default class AvaliacaoProfessoresCrud extends React.Component {

    constructor() {
        super()

        this.state = { ...initialState }

        this.clear = this.clear.bind(this)
        this.save = this.save.bind(this)
        // this.getUpdatedList = this.getUpdatedList.bind(this)
        this.updateField = this.updateField.bind(this)
        this.load = this.load.bind(this)
        this.remove = this.remove.bind(this)
        this.handleEnterPress = this.handleEnterPress.bind(this)
    }

    componentWillMount() {
        axios.get(api).then(response => {
            this.setState({ list: response.data })
        })
    }

    handleEnterPress(event) {
        if (event.key === 'Enter') {
            this.save()
        }
    }

    clear() {
        this.setState({ avaliacaoProfessores: initialState.avaliacaoProfessores })
    }

    save() {
        const avaliacaoProfessores = this.state.avaliacaoProfessores
        const method = avaliacaoProfessores.id ? 'put' : 'post'
        const url = avaliacaoProfessores.id ? `${api}/professores/${avaliacaoProfessores.id}` : `${api}/professores/` 

        if (avaliacaoProfessores.professores.length === 0 || avaliacaoProfessores.avaliacao.length === 0) {
            NotificationManager.warning('Professores e avaliações obrigatórios', 'Preencha os campos')
        } else {
            axios[method](url, avaliacaoProfessores)
                .then(response => {
                    // const list = this.getUpdatedList(response.data)
                    // this.setState({ avaliacaoProfessores: initialState.avaliacaoProfessores, list })
                    if (method === 'post')
                        NotificationManager.success('Avaliação de professor criado com sucesso', 'Criar avaliação de professor')
                    else
                        NotificationManager.success('Avaliação de professor alterado com sucesso', 'Editar avaliação de professor')
                })
                setTimeout(function(){window.location.reload }, 2000);
        }

    }

    // getUpdatedList(avaliacaoProfessores, add = true) {
    //     const list = this.state.list.filter(u => u.id !== avaliacaoProfessores.id)
    //     if (add)
    //         list.unshift(avaliacaoProfessores)
    //     return list
    // }

    updateField(event) {
        const avaliacaoProfessores = { ...this.state.avaliacaoProfessores }
        avaliacaoProfessores[event.target.name] = event.target.value
        this.setState({ avaliacaoProfessores })
    }

    load(avaliacaoProfessores) {
        this.setState({ avaliacaoProfessores })
    }

    remove(avaliacaoProfessores) {
        axios.delete(`${api}/${avaliacaoProfessores.id}`)
            .then(response => {
                const list = this.getUpdatedList(avaliacaoProfessores, false)
                this.setState({ list })
                NotificationManager.success('Avaliação de professor excluído com sucesso', 'Exclusão avaliação de professor')
            })
            setTimeout(function(){window.location.reload }, 2000);
    }

    render() {
        return (
            <Main {...headerProps}>
                <AvalicaoProfessoresform professores={this.state.avaliacaoProfessores.professores}
                    avaliacao={this.state.avaliacaoProfessores.avaliacao}
                    clear={this.clear}
                    save={this.save}
                    updateField={this.updateField}
                    handleEnterPress={this.handleEnterPress}
                />
                <AvalicaoProfessoresTable list={this.state.list}
                    load={this.load}
                    remove={this.remove}
                />
            </Main>
        )
    }
}