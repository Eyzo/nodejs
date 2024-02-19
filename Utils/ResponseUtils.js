/**
 * @param {String} message
 * @param {Array} data
 * @returns {{data: Array, success: String}}
 */
module.exports.responseSuccess = function (message, data)
{
  return {
    'success': message,
    'data': data
  }
}

/**
 * @param {String} message
 * @param {Array} data
 * @returns {{data: Array, error: String}}
 */
module.exports.responseError = function (message, data)
{
  return {
    'error': message,
    'data': data
  }
}