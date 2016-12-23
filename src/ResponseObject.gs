/*
 * "Constructor" for the ResponseObject
 */
function ResponseObject() {
  this.success = false;
  this.data = null;
  this.error = null;
  
  /*
  * Succeeds the ResponseObject
  */
  this.succeed = function(data) {
    this.success = true;
    this.error = null;
    this.data = data || {};
    return this;
  };
  
  /*
  * Fails the ResponseObject
  */
  this.fail = function(webApiException, data) {
    this.success = false;
    this.error = webApiException;
    this.data = data || {};
    return this;
  };
  
  /*
  * Serializes the ResponseObject to JSON
  */
  this.serialize = function(prettyPrint) {
    return prettyPrint ? JSON.stringify(this, null, '  ') : JSON.stringify(this); 
  };
  
  /*
  * Creates the HTTP response object from the ResponseObject
  */
  this.toHttpResponse = function() {
    return ContentService.createTextOutput(this.serialize()).setMimeType(ContentService.MimeType.JSON);
  }
}