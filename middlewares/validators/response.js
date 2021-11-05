'use strict'

const deleteResponseSchema = {
    id: {
        in: ['params'],
        errorMessage: 'No params id provided'
    }
}

const getResponseSchema = {
    id: {
        in: ['params'],
        errorMessage: 'No params id provided'
    }
}

const getAllResponseSchema = {
    limit: {
        in: ['query'],
        isString : true,
        toInt : true,
        optional : true,
        errorMessage : 'Limit must be a number'
    },

    skip: {
        in: ['query'],
        isString: true,
        optional : true,
        errorMessage: 'Skip must be a number'
    },

    filter: {
        in: ['query'],
        optional: true,
        errorMessage: 'Filter must be an object'
    },

}

module.exports = { deleteResponseSchema, getResponseSchema, getAllResponseSchema }