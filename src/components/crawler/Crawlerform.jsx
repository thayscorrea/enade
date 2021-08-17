import React from 'react'

export default props =>
    <div className="form">
        <hr />
        <div className="row">
            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-success" onClick={props.save}>
                    <i className="fa fa-play mr-1"></i> Executar Crawler
                </button>
            </div>
        </div>
    </div>