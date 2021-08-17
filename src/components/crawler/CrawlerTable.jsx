import React from 'react'

export default props => {

    const lista = props.list

    return (
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Ano da Prova</th>
                    <th>Questao</th>
                    <th>Altenativas</th>
                    <th>Alternativa Correta</th>
                    <th>Açoes</th>
                </tr>
            </thead>
            <tbody>
                {lista.map(provas => {
                    return (
                        <tr key={provas.id}>
                            <td>{provas.id}</td>
                            <td>{provas.ano}</td>
                            <td>{provas.enunciado}</td>
                            <td>{provas.alternativas}</td>
                            <td>{provas.alternativa_correta}</td>
                            <td>
                                <button className="btn btn-warning" title='Editar' onClick={() => props.load(provas)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-danger ml-2" id='btn-excluir' title='Excluir' onClick={() => props.remove(provas)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}