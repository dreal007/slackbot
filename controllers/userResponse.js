'use strict'
const { transformResponse, transformExpressValidationErrors } = require('../utils/transformer');
const { validationResult } = require('express-validator');
const { getResponses, deleteResponse } = require('../processors/userResponse');
const Cntrl = {}

Cntrl.getAllResponses = function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let msg = transformExpressValidationErrors(errors.array());
        return res.status(400).json(transformResponse(0, msg, errors.mapped()));
    }

    let query = req.query;
    if(req.params.id) query.id = req.params.id;

    getResponses(query).then((responses)=>{
        res.json(transformResponse(1, 'ok', responses));
    }).catch((error)=>{
        res.status(400).json(transformResponse(0, error.message));
    });
}

Cntrl.deleteResponse = function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let msg = transformExpressValidationErrors(errors.array());
        return res.status(400).json(transformResponse(0, msg, errors.mapped()));
    }

    deleteResponse(req.params.id).then((deletedResponse) => {
        if(deletedResponse)
        res.json(transformResponse(1, 'ok', deletedResponse));
    }).catch((error) => {
        res.status(400).json(transformResponse(0, error.message));
    });
}



module.exports = Cntrl;