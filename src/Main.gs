/*
 * Token generation
 */
function generateNewToken() {
  var newToken = new GuidUtility().generate();
  new SecurityUtility().addToken(newToken);
  Logger.log('Added new auth token ' + newToken);
}

/*
 * Main entry point for the program
 */
function doPost(e) {
  // Get the request payload (or empty string if no payload)
  var requestPayloadString = e.postData ? e.postData.contents : '';
  
  // Process the request payload and generate a response payload
  var responsePayloadObject = new RequestHandler().handleRequest(requestPayloadString);
  
  // Serialize the payload object to JSON
  return responsePayloadObject.toHttpResponse();
}