import React from 'react'

export default props => {

    const lista = props.list

    return (
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                {lista.map(cursos => {
                    return (
                        <tr key={cursos.id}>
                            <td>{cursos.id}</td>
                            <td>{cursos.name}</td>
                            <td>
                                <button className="btn btn-warning" title='Editar' onClick={() => props.load(cursos)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-danger ml-2" id='btn-excluir' title='Excluir' onClick={() => props.remove(cursos)}>
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