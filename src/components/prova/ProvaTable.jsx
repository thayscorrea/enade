import React from 'react'

export default props => {

    const lista = props.list

    return (
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Data de criação</th>
                    <th>Cursos</th>
                    <th>Número de questão por curso</th>
                </tr>
            </thead>
            <tbody>
                {lista.map(prova => {
                    return (
                        <tr key={prova.id}>
                            <td>{prova.data}</td>
                            <td>{prova.curso}</td>
                            <td>{prova.num_questoes}</td>
                            <td>
                                <button className="btn btn-warning" title='Editar' onClick={() => props.load(prova)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-danger ml-2" id='btn-excluir' title='Excluir' onClick={() => props.remove(prova)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}