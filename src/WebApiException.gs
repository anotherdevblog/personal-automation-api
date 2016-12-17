/*
 * "Constructor" for the WebApiException
 */
function WebApiException(errorCode, errorMessage) {
  this.errorCode = errorCode || ErrorCode.UNKNOWN;
  this.errorMessage = errorMessage || '';
}