import React from 'react'

export default props =>
    <div className="form">
        <div className="row">
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Enunciado</label>
                    <input type="text"
                        name="enunciado"
                        id="enunciado"
                        className="form-control"
                        autoComplete='off'
                        value={props.enunciado}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}
                        placeholder='Digite o enunciado...' />
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Alternativa A</label>
                    <input type="text"
                        name="alternativaA"
                        id="alternativaA"
                        className="form-control"
                        autoComplete='off'
                        value={props.alternativaA}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}
                        placeholder="Digite a alternativa A..." />
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Alternativa B</label>
                    <input type="text"
                        name="alternativaB"
                        id="alternativaB"
                        className="form-control"
                        autoComplete='off'
                        value={props.alternativaB}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}
                        placeholder="Digite a alternativa B..." />
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Alternativa C</label>
                    <input type="text"
                        name="alternativaC"
                        id="alternativaC"
                        className="form-control"
                        autoComplete='off'
                        value={props.alternativaC}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}
                        placeholder="Digite a alternativa C..." />
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Alternativa D</label>
                    <input type="text"
                        name="alternativaD"
                        id="alternativaD"
                        className="form-control"
                        autoComplete='off'
                        value={props.alternativaD}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}
                        placeholder="Digite a alternativa D..." />
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Alternativa E</label>
                    <input type="text"
                        name="alternativaE"
                        id="alternativaE"
                        className="form-control"
                        autoComplete='off'
                        value={props.alternativaE}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}
                        placeholder="Digite a alternativa E..." />
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