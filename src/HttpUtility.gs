/*
 * Enum for HTTP request method types
 */
var HttpRequestMethod = {
  GET: 'GET',
  POST: 'POST'
};

/*
 * "Constructor" for the HttpUtility
 */
function HttpUtility() {
  /*
   * Issues a request and returns the contents as text
   */
  this.issueTextRequest = function(method, url, body, headers, ignoreInvalidSslCerts) {
    return this.issueRequest(method, url, body, headers, ignoreInvalidSslCerts).getContentText();
  };
  
  /*
   * Issues a request and returns the HTTP response object
   */
  this.issueRequest = function (method, url, body, headers, ignoreInvalidSslCerts) {
    return UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      method: method,
      payload: body,
      headers: headers || {},
      validateHttpsCertificates: !ignoreInvalidSslCerts
    });
  };
}
