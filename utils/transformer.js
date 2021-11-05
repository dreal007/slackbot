function transformResponse(responseCode, responseText, payload) {
    if (!payload) {
        payload = {};
    }

    return {
        responseCode: responseCode,
        responseText: responseText,
        payload: payload
    };
}

/**
 *
 * @param errors {Array}
 * @returns {string}
 * @description transforms errors generated by express validator to a single message string with each message separated by '|'
 */
function transformExpressValidationErrors(errors) {
    if (!Array.isArray(errors))
        return '';

    return errors.map(i => { return i.msg }).join('|');
}

module.exports = { transformResponse, transformExpressValidationErrors };