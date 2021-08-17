import React from 'react'

export default props => {

    const lista = props.list

    return (
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Professor</th>
                    <th>Avaliação</th>
                </tr>
            </thead>
            <tbody>
                {lista.map(avaliacaoProfessores => {
                    return (
                        <tr key={avaliacaoProfessores.id}>
                            <td>{avaliacaoProfessores.professor}</td>
                            <td>{avaliacaoProfessores.avaliacao}</td>
                            <td>
                                <button className="btn btn-warning" title='Editar' onClick={() => props.load(avaliacaoProfessores)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-danger ml-2" id='btn-excluir' title='Excluir' onClick={() => props.remove(avaliacaoProfessores)}>
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