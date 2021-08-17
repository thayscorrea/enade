import React from 'react'

export default props =>
    <div className="form">
        <div className="row">
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Professores</label>
                    <select type="select"
                        name="professores"
                        id="professores"
                        className="form-control"
                        autoComplete='off'
                        value={props.professores}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}>
                        <option value="0">Selecione uma opçáo</option>
                    </select>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Avaliação</label>
                    <select type="select"
                        name="avaliacao"
                        id="avaliacao"
                        className="form-control"
                        autoComplete='off'
                        value={props.avaliacao}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}>
                        <option value="0">Selecione uma opçáo</option>
                        <option value="Péssimo">Péssimo</option>
                        <option value="Ruim">Ruim</option>
                        <option value="Regular">Regular</option>
                        <option value="Bom">Bom</option>
                        <option value="Ótimo">Ótimo</option>
                    </select>
                </div>
            </div>
        </div>

        <hr />

        <div className="row">
            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-success" onClick={props.save}>
                    <i className="fa fa-save mr-1"></i> Salvar
                </button>
                <button className="btn btn-danger ml-2" onClick={props.clear}>
                    <i className="fa fa-remove mr-1"></i> Cancelar
                </button>
            </div>
        </div>

    </div>