'use strict'

const  { Response }  = require('../models');

function createResponse(data){
    let payload = {
        username: data.user_name,
        user_id: data.user_id,
        workspace: data.team_domain,
        workspace_id: data.team_id,
        greeting: data.text
    }
    return Response.findOneAndUpdate(
            {...payload},
            payload,
            {upsert: true, new: true}
        )
        .then((newResponse)=>{
            if(!newResponse) throw new Error('Response not created');
            return newResponse;
    });
}

//make it search with filter..............................
function getResponses(params){
    if(params.id){
        return Response.findOne({ _id : params.id });
    }
    return Response.find().skip(params.skip).limit(params.limit).lean();
}

function updateResponse(params, data){
    return Response.findOneAndUpdate({ ...params }, {$set : { ...data }}, { new : true })
    .then((updatedResponse)=>{
        if(!updatedResponse) throw new Error('Response not upated');
        return updatedResponse;
    })   
}

function deleteResponse(id){
    return Response.findOneAndDelete({ _id : id });
}


module.exports = { createResponse, getResponses, deleteResponse, updateResponse }