const request = require("request-promise");

const authHeader = 'Authorization';
const gApiAuthHeader = 'gapiauth';

exports.GAPI_AUTH_HEADER = gApiAuthHeader;
exports.AUTH_HEADER = authHeader;

exports.createRequest = (event, url, method = 'GET', body = null) => {
    const headerValue = event.headers[gApiAuthHeader] || event.headers['Gapiauth'];
    const params = {
        json: true,
        headers: {
            [authHeader]: headerValue,
            'Content-Type': 'application/json'
        },
        url: url,
        method: method,
    };

    return request(body ? Object.assign(params, { body: body }) : params);
}

exports.handleDownstreamError = (error, callback) => {
    console.error(`Failed to invoke google api, code: ${error.statusCode} body: ${JSON.stringify(error.body)}`);
    callback("Failed to communicate downstream.");
}