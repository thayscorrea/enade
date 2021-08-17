import React from 'react'

export default props =>
    <div className="form">
        <div className="row">
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Cursos</label>
                    <select type="select"
                        name="cursos"
                        id="cursos"
                        className="form-control"
                        autoComplete='off'
                        value={props.cursos}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}>
                        <option value="0">Selecione uma opçáo</option>
                    </select>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Número de questões</label>
                    <input type="number"
                        name="num_questoes"
                        id="num_questoes"
                        className="form-control"
                        autoComplete='off'
                        value={props.num_questoes}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}
                        placeholder='Digite o número de questões a serem geradas para cada curso...' />
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