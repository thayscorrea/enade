import React from 'react'

export default props => {

    const lista = props.list

    return (
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Aluno</th>
                    <th>Rendimento</th>
                </tr>
            </thead>
            <tbody>
                {lista.map(alunos => {
                    return (
                        <tr key={alunos.id}>
                            <td>{alunos.aluno}</td>
                            <td>{alunos.rendimento}</td>
                            <td>
                                <button className="btn btn-warning" title='Editar' onClick={() => props.load(alunos)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-danger ml-2" id='btn-excluir' title='Excluir' onClick={() => props.remove(alunos)}>
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