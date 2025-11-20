const mongoose = require('mongoose');

module.exports.BAuth = function (req) 
{
    // basic auth method
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const decrypted = Buffer.from(b64auth, 'base64').toString().split(':');

    return { username: decrypted[0], password: decrypted[1] };
}

module.exports.AssertParams = function (reqParams, paramName)
{
    if (!reqParams[paramName])
        throw Error(`'${paramName}' property not found.`);
}
