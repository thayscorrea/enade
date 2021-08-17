import React from 'react'

export default props => {

    const lista = props.list.data
    
    return (
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Tipo de Usuário</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {lista && lista.map(user => {
                   return ( 
                       user.data !== undefined && user.data.map(u => {
                           user.cargo === 'Reitor' ? u['tipo'] = 1 : user.cargo === 'Professor' ? u['tipo'] = 2 : user.cargo === 'Estudante' ? user['tipo'] = 3 : null
                           return(
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.nome}</td>
                                    <td>{u.email}</td>
                                    <td>{user.cargo}</td>
                                    <td>
                                        <button className="btn btn-warning" title='Editar' onClick={() => props.load(u)}>
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                        <button className="btn btn-danger ml-2" id='btn-excluir' title='Excluir' onClick={() => props.remove(u)}>
                                            <i className="fa fa-trash"></i>
                                        </button> 
                                    </td>
                                </tr>
                           )
                       }) 
                    )})}
            </tbody>
        </table>
    )
}