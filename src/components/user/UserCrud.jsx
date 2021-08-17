import React from 'react'
import Main from '../template/Main'
import Userform from './Userform'
import UserTable from './UserTable'
import axios from 'axios'
import api from '../../services/api'

import { NotificationManager } from 'react-notifications'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de Usuários: Incluir, Listar, Alterar e Excluir'
}

const initialState = {
    user: {
        nome: '',
        email: '',
        tipo: ''
    },
    list: []
}

export default class UserCrud extends React.Component {

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
        axios.get(api + 'users/getall').then(response => {
            this.setState({ list: response.data })
        })
    }

    handleEnterPress(event) {
        if (event.key === 'Enter') {
            this.save()
        }
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${api}/users/edit/${user.id}` : `${api}/users/insert`

        if (user.nome === '' || user.email === '' || user.tipo === '0') {
            NotificationManager.warning('Nome e e-mail obrigatórios', 'Preencha os campos')
        } else {
            axios[method](url, user)
                .then(response => {
                    const list = this.componentWillMount()
                    this.setState({ user: initialState.user, list })
                    if (response.status == 200)
                        NotificationManager.success('Usuário criado com sucesso', 'Criar Usuário')
                    else
                        NotificationManager.success('Usuário alterado com sucesso', 'Editar Usuário')
                })

                setTimeout(function(){window.location.reload }, 2000);
        }

    }

    // getUpdatedList(user, add = true) {
    //     const list = this.state.list.filter(u => u.id !== user.id)
    //     if (add)
    //         list.unshift(user)
    //     return list
    // }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        console.log(user)
        axios['post'](`${api}users/delete`, user)
            .then(response => {
                // const list = this.getUpdatedList(user, false)
                // this.setState({ list })
                NotificationManager.success('Usuário excluído com sucesso', 'Excluir Usuário')
                setTimeout(function(){window.location.reload }, 2000);
            })
    }

    render() {
        return (
            <Main {...headerProps}>
                <Userform nome={this.state.user.nome}
                    email={this.state.user.email}
                    tipo={this.state.user.tipo}
                    clear={this.clear}
                    save={this.save}
                    updateField={this.updateField}
                    handleEnterPress={this.handleEnterPress}
                />
                <UserTable list={this.state.list}
                    load={this.load}
                    remove={this.remove}
                />
            </Main>
        )
    }
}